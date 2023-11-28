import { defineComponent } from "vue";

export default defineComponent({
  setup(props, { slots }) {
    return (
      <div class="staicky-w">
        {{
          default: () => slots?.default,
          header: () => slots?.header,
          footer: () => slots?.footer,
        }}
      </div>
    );
  },
});
