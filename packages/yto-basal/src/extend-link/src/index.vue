<script lang="ts">
import { defineComponent, h } from "vue";
import useRouteQuery from "@/composables/useRouteQuery";
export default defineComponent({
  props: {
    path: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, context) {
    const { router } = useRouteQuery();
    return () => {
      return h(
        "span",
        {
          class: "span-link",
          onClick: () => {
            if (props.name) {
              router.push({ name: props.name, params: { ...props.data } });
            } else if (props.path) {
              router.push({ path: props.path });
            }
          },
        },
        { default: () => context.slots }
      );
    };
  },
});
</script>
<style lang="scss" scoped>
.span-link {
  color: $important-color;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
