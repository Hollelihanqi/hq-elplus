<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-03-08 11:55:21
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-06-04 09:26:11
 * @FilePath: \xlfk-vite-vue3\src\cusComponents\CustomStaffSelect.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="tsx">
import { defineComponent, h } from "vue";
import { YtoRemoteSearch } from "@yto/custom";
import { getToken } from "@/utils";

export default defineComponent({
  setup(props, context) {
    const YtoRemoteSearchIns = ref();
    const YtoRemoteSearchIns2 = ref();
    const _getInstance = (ins: any) => {
      YtoRemoteSearchIns.value = ins;
    };
    const _getInstance2 = (ins: any) => {
      YtoRemoteSearchIns2.value = ins;
    };
    const setOptions = (arr = []) => {
      YtoRemoteSearchIns.value?.setOptions(arr);
    };
    const clearOptions = () => {
      YtoRemoteSearchIns.value?.clearOptions();
    };
    const getSelected = () => {
      return YtoRemoteSearchIns2.value;
    };
    context.expose({ setOptions, getSelected, clearOptions });
    return () => {
      return h(YtoRemoteSearch, {
        url: "/api/processor/getUser",
        method: "POST",
        remote: true,
        searchField: "prefix",
        valueKey: "userCode",
        labelKey: "userName",
        collapseTags: false,
        reserveKeyword: false,
        requestHeaders: {
          "Content-Type": "application/json",
          authorization: getToken(),
        },
        getInstance: _getInstance2,
        getExposed: _getInstance,
        ...context.attrs,
      });
    };
  },
});
</script>
