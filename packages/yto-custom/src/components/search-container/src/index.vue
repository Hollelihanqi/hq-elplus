<script lang="tsx">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchContainer",
  props:{
    isUseForm:{
      type:Boolean,
      default:false
    }
  },
  setup(props, { slots }) {
    return () => (
      props.isUseForm? <el-form class="flex flex-wrap">
        {slots.default && slots.default()}
        <div class="flex-1 text-right">
          {slots.operation && slots.operation()}
        </div>
      </el-form>: <div class="flex flex-wrap">
        {slots.default && slots.default()}
        <div class="flex-1 text-right">
          {slots.operation && slots.operation()}
        </div>
      </div>

    )
  }
})
</script>
