<template>
  <div ref="ellipsisTagRef" v-resize-element="handleResize" class="ellipsis-tag flex w-full">
    <div class="flex-1 overflow-hidden">
      <div class="tag-box">
        <template v-for="(tag, index) in tags" :key="tag[valueKey] || index">
          <slot :info="tag">
            <p class="tag" :style="tag.style">
              {{ tag.label }}
            </p>
          </slot>
        </template>
      </div>
    </div>
    <el-popover popper-class="ellipsis-tag-popover" placement="top-end" :width="360" trigger="hover" v-bind="$attrs">
      <template #default>
        <ul class="tag-box">
          <template v-for="(tag, index) in tags" :key="tag[valueKey] || index">
            <slot :info="tag">
              <p class="tag" :style="tag.style">
                {{ tag[labelKey] }}
              </p>
            </slot>
          </template>
        </ul>
      </template>
      <template #reference>
        <div v-show="shoEllipsis" class="ellipsis">
          <slot name="ellipsis">
            <el-icon color="#7f7f7f">
              <MoreFilled />
            </el-icon>
          </slot>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup name="EllipsisTag">
import { MoreFilled } from "@element-plus/icons-vue";
import { resizeElement as vResizeElement } from "@/directives";

interface Props {
  tags?: Array<any>;
  valueKey?: string;
  labelKey?: string;
}
const props = withDefaults(defineProps<Props>(), {
  valueKey: "value",
  labelKey: "label",
  tags: () => {
    return [];
  },
});
const ellipsisTagRef = ref();
const shoEllipsis = ref(false);
const handleResize = (info: any) => {
  // console.log('resize', info);
  const boxEl = unref(ellipsisTagRef).querySelector(".ellipsis-tag .tag-box");
  if (!boxEl) return;
  const boxWidth = boxEl.getBoundingClientRect().width;
  shoEllipsis.value = info.width < boxWidth;
};
</script>
<style lang="scss" scoped>
.ellipsis-tag {
  .tag-box {
    white-space: nowrap;
    width: fit-content;
  }

  .ellipsis {
    @apply rounded-[2px] px-[4px] py-[4px] bg-white;
    border: 1px solid rgba(0, 0, 0, 0.06);
  }
}
</style>
<style lang="scss">
.ellipsis-tag,
.ellipsis-tag-popover {
  .tag {
    @apply rounded-[2px] inline-block mr-[8px] px-[8px] py-[4px];
    border: 1px solid rgba(0, 0, 0, 0.15);
    word-break: keep-all;
  }
}

.el-popover.ellipsis-tag-popover {
  @apply px-[8px] pt-[8px] pb-0;

  .tag {
    @apply mb-[8px];
  }
}
</style>
