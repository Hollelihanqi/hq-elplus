<!--
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-03-08 11:55:21
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2023-03-13 13:13:16
 * @FilePath: \xlfk-vite-vue3\src\cusComponents\CustomStaffSelect.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script lang="tsx">
import { defineComponent, h } from "vue";
import SearchSelect from "@/components/remote-search";
export default defineComponent({
  name: "StaffSearch",
  setup(props, context) {
    return () => {
      return h(SearchSelect, {
        url: "/service-api/index/user/search",
        remote: true,
        searchField: "keyword",
        valueKey: "userCode",
        labelKey: "selText",
        placeholder: "请输入用户编号/姓名",
        requestParams: {
          pageNum: 1,
          pageSize: 50,
        },
        ...context.attrs,
        dataCallback: (data: any) => {
          return data.results.map((item: any) => {
            return { ...item, selText: `${item.userName} (${item.userCode})` };
          });
        },
        optTemp: (item: any) => {
          return h(
            "div",
            {
              class: "option-c",
              style: {
                display: "flex",
                alignItems: "center",
              },
            },
            [
              h("span", {}, `${item.userName} -`),
              h("span", {}, `${item.userCode} -`),
              h("span", {}, `${item.deptName} -`),
              h("span", {}, item.jobName),
            ]
          );
        },
      });
    };
  },
});
</script>
