import { defineComponent } from 'vue';
import './index.scss';

export default defineComponent({
  name: 'StickyContainer',
  setup(props, { slots }) {
    return () => (
      <div class="staicky-w h-full flex flex-col overflow-y-hidden">
        {slots.header && <div class="staicky-h"> {slots.header()}</div>}
        <div class="staicky-c flex-1 h-0">
          <el-scrollbar height="100%">
            {slots.default && slots.default()}{' '}
            {slots.footer && <div class="staicky-f sticky bottom-0 z-99">{slots.footer()}</div>}
          </el-scrollbar>
        </div>
      </div>
    );
  },
});

{
  /* <style lang="scss">
@import "./index.scss";
</style> */
}
