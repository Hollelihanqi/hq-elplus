<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchContainer",
  setup(props, { slots }) {
    return () => (
      <div class="flex flex-wrap">
        {slots.default && slots.default()}
        <div class="flex-1 text-right">
          {slots.operation && slots.operation()}
        </div>
      </div>
    )
  }
})
</script>
