import { ref, watch, computed, reactive, defineComponent, type PropType, type CSSProperties, Ref } from "vue";

import { useScrollParent, useRect, useEventListener, useVisibilityChange } from "./hooks/index";
import "./index.scss";

export const numericProp = [Number, String];
export type StickyPosition = "top" | "bottom";
export const makeStringProp = <T,>(defaultVal: T) => ({
  type: String as unknown as PropType<T>,
  default: defaultVal,
});

export const makeNumericProp = <T,>(defaultVal: T) => ({
  type: numericProp,
  default: defaultVal,
});

export function getZIndexStyle(zIndex?: number | string) {
  const style: CSSProperties = {};
  if (zIndex !== undefined) {
    style.zIndex = +zIndex;
  }
  return style;
}
export function getScrollTop(el: Element | Window): number {
  const top = "scrollTop" in el ? el.scrollTop : el.pageYOffset;
  return Math.max(top, 0);
}
export function isHidden(elementRef: HTMLElement | Ref<HTMLElement | undefined>) {
  const el = unref(elementRef);
  if (!el) return false;
  const style = window.getComputedStyle(el);
  const hidden = style.display === "none";
  const parentHidden = el.offsetParent === null && style.position !== "fixed";
  return hidden || parentHidden;
}
export const unitToNumber = (value: string | number): number => {
  if (typeof value === "number") return value;
  if (value.includes("px")) {
    parseFloat(value.replace("px", ""));
  }
  return parseFloat(value);
};

export const stickyProps = {
  zIndex: numericProp,
  position: makeStringProp<StickyPosition>("top"),
  container: Object as PropType<Element>,
  offsetTop: makeNumericProp(0),
  offsetBottom: makeNumericProp(0),
};

export default defineComponent({
  name: "Sticky",
  props: stickyProps,
  emits: ["scroll", "change"],
  setup(props, { emit, slots }) {
    const root = ref<HTMLElement>();
    const sticySelf = ref<HTMLElement>();
    const scrollParent = useScrollParent(root);

    const scrollParentRect = ref({
      width: 0,
      height: 0,
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    });

    const state = reactive({
      fixed: false,
      width: 0,
      height: 0,
      transform: 0,
      left: 0,
    });
    const offset = computed(() => unitToNumber(props.position === "top" ? props.offsetTop : props.offsetBottom));

    const rootStyle = computed<CSSProperties | undefined>(() => {
      const { fixed, height, width } = state;
      if (fixed) {
        return {
          width: `${width}px`,
          height: `${height}px`,
        };
      }
      return undefined;
    });

    const stickyStyle = computed<CSSProperties | undefined>(() => {
      if (!state.fixed) {
        return;
      }
      const style: CSSProperties = Object.assign(getZIndexStyle(props.zIndex), {
        width: `${state.width}px`,
        height: `${state.height}px`,
        [props.position]: `${offset.value}px`,
        left: `${state.left}px`,
      });

      if (state.transform) {
        style.transform = `translate3d(0, ${state.transform}px, 0)`;
      }

      return style;
    });

    const emitScroll = (scrollTop: number) => emit("scroll", { scrollTop, isFixed: state.fixed });

    const onScroll = () => {
      if (!root.value || isHidden(root)) return;

      const { container, position } = props;
      const rootRect = useRect(root);
      const scrollTop = getScrollTop(window);

      state.width = rootRect.width;
      state.height = rootRect.height;

      if (position === "top") {
        // 吸顶
        if (container) {
          // 获取容器的{ x, y, width, height }
          const containerRect = useRect(container);

          console.log("containerRect", containerRect);
          console.log("scrollParent", scrollParent);
          // 备注：container 在滚动元素中不可见时，取消吸顶; 【容器的 bottom - 滚动父级的top < 0 说明容器在滚动元素中不可见了】
          const differenceHeight = containerRect.bottom - scrollParentRect.value.top;
          console.log("differenceHeight", differenceHeight);

          // 高度的差值 difference < 0 说明容器在滚动元素中不可见
          const difference = containerRect.bottom - offset.value - state.height;
          state.fixed = differenceHeight > 0 && containerRect.bottom > 0 && offset.value > rootRect.top; // offset.value > rootRect.top && containerRect.bottom > 0 && difference > 0;
          // state.transform = difference < 0 ? difference : 0;

          console.log("difference", difference);
          console.log("offset.value", offset.value);
          console.log("state.height", state.height);
          console.log("====================================");
        } else {
          // 没有指定容器的时候，在当前父级滚动parent中吸顶
          console.log("rootRect.top:", rootRect.top);
          // stickyStyle;
          state.fixed = offset.value > rootRect.top;
        }
      } else {
        // 吸底
        const { clientHeight } = document.documentElement;
        if (container) {
          // 获取容器的{ x, y, width, height }
          const containerRect = useRect(container);
          // 高度的差值
          const difference = clientHeight - containerRect.top - offset.value - state.height;
          state.fixed = clientHeight - offset.value < rootRect.bottom && clientHeight > containerRect.top;
          state.transform = difference < 0 ? -difference : 0;
        } else {
          const scrollParentHeight = scrollParentRect.value.height;

          console.log("rootRect", rootRect);
          console.log("scrollParentHeight", scrollParentHeight);

          state.fixed = scrollParentHeight - offset.value < rootRect.bottom; // clientHeight - offset.value < rootRect.bottom;
        }
      }

      emitScroll(scrollTop);
    };

    watch(
      () => state.fixed,
      (val: boolean) => emit("change", val)
    );

    useEventListener("scroll", onScroll, {
      target: scrollParent,
      passive: true,
    });
    useVisibilityChange(root, onScroll);

    onMounted(() => {
      state.left = useRect(sticySelf).left;
      console.log("state.left", useRect(sticySelf), sticySelf.value);

      scrollParentRect.value = useRect(scrollParent);
      console.log("scrollParent", scrollParent);
      console.log("scrollParent useRect", useRect(scrollParent));
    });

    return () => (
      <div ref={root} style={rootStyle.value} class={{ "c-sticky-root": true }}>
        <div ref={sticySelf} class={{ "c-sticky": true, "c-sticky--fixed": state.fixed }} style={stickyStyle.value}>
          {slots.default?.()}
        </div>
      </div>
    );
  },
});
