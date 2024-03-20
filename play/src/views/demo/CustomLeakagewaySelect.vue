<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-03-08 11:55:21
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2023-03-13 13:13:16
 * @FilePath: \xlfk-vite-vue3\src\cusComponents\CustomStaffSelect.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="tsx">
import { defineComponent, h } from 'vue';
import { YtoRemoteSearch } from '@yto/custom';
export default defineComponent({
  setup(props, context) {
    const _headers = () => {
      let token = sessionStorage.getItem('authorization') as string;
      if (token) {
        if (token.indexOf('"') !== -1) {
          const regex = /^"(.*)"$/;
          const matches: any = token.match(regex);
          token = matches[1];
        }
      }
      return {
        authorization: token,
      };
    };
    const _params = ref({
      page: 1,
      size: 100,
    });
    const testFun = () => {
      _params.value.size += 1;
      console.log(_params.value);
    };
    context.expose({ testFun });
    return () => {
      return h(YtoRemoteSearch, {
        url: '/api/v2/risks_leakageway',
        valueKey: 'id',
        labelKey: 'name',
        isRemoteSearch: false,
        collapseTags: true,
        maxCollapseTags: 1,
        requestHeaders: _headers,
        requestParams: _params.value,
        ...context.attrs,
      });
    };
  },
});
</script>
