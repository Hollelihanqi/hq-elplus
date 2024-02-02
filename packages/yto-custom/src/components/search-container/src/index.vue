<script lang="tsx">
import { defineComponent, resolveDirective, withDirectives } from "vue";
import { resizeElement } from "@/directives";
export default defineComponent({
  name: "SearchContainer",
  directives: { resizeElement },
  props: {
    isUseForm: {
      type: Boolean,
      default: false,
    },
    itemMinWidth: {
      type: Number,
      default: 0,
    },
  },
  emits: ["resize"],
  setup(props, { emit, slots }) {
    const resizeDirective = resolveDirective("resizeElement");
    const handleResize = (info: any) => {
      if (!props.itemMinWidth) return;
      let num = Math.floor(info.width / props.itemMinWidth);
      const itemWidth = info.width / num;
      if (itemWidth < props.itemMinWidth) {
        num -= 1;
      }
      emit("resize", Math.floor(info.width / num));
    };
    return () =>
      props.isUseForm ? (
        // withDirectives(
        //   <el-form class="flex flex-wrap search-container">
        //     {slots.default && slots.default()}
        //     <div class="flex-1 text-right">{slots.operation && slots.operation()}</div>
        //   </el-form>,
        //   [[resizeDirective, handleResize]]
        // )
        <el-form v-resizeElement={handleResize} class="flex flex-wrap search-container">
          {slots.default && slots.default()}
          <div class="flex-1 text-right">{slots.operation && slots.operation()}</div>
        </el-form>
      ) : (
        <div v-resizeElement={handleResize} class="flex flex-wrap search-container">
          {slots.default && slots.default()}
          <div class="flex-1 text-right">{slots.operation && slots.operation()}</div>
        </div>
      );
  },
});
</script>
