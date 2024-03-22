<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-04-22 14:08:34
 * @LastEditTime: 2023-12-11 15:09:54
-->
<script lang="ts">
import { defineComponent, PropType, h } from "vue";
import { Props, IMenuData } from "./props";
import { ElMenu, ElMenuItem, ElSubMenu, ElMenuItemGroup } from "element-plus";
import { logger } from "@/_utils";

// export interface IMenuData {
//   name: string;
//   path?: string;
//   icon?: String;
//   type?: "group";
//   children: IMenuData[];
// }
// type CanWrite<T> = {
//   -readonly [K in keyof T]?: T[K];
// };
export default defineComponent({
  name: "Menu",
  props: Props,
  // props: {
  //   menuData: {
  //     type: Array as PropType<IMenuData[]>,
  //     default: () => [],
  //   },
  //   menuItemConfig: {
  //     type: Object as PropType<CanWrite<MenuItemProps>>,
  //     required: false,
  //     default: () => {
  //       return {};
  //     },
  //   },
  //   subMenuConfig: {
  //     type: Object as PropType<CanWrite<SubMenuProps>>,
  //     required: false,
  //     default: () => ({}),
  //   },
  //   showCollapse: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  // emit: {
  //   open(index: string, indexPath: string) {},
  //   close(index: string, indexPath: string) {},
  //   select(index: string, indexPath: string, item: IMenuData, routeResult: boolean) {},
  //   itemClick(item: IMenuData) {},
  // },
  emits: ["open", "close", "select", "itemClick"],
  setup(props, context) {
    const renderTitle = (e: IMenuData) => {
      const title = [h("span", e.name)];
      e.icon && title.unshift(h("i", { class: `iconfont ${e.icon}` }));
      return title;
    };
    const renderChildren = (meu: IMenuData[]) => {
      logger("***", meu);

      return meu.map((e: IMenuData) => {
        if (e.type === "group") {
          return h(
            ElMenuItemGroup,
            { title: e.name },
            {
              default: () => renderChildren(e.children),
            }
          );
        } else if (e.children && e.children.length) {
          return h(
            ElSubMenu,
            {
              index: e.path || e.name,
              ...props.subMenuConfig,
            },
            {
              default: () => renderChildren(e.children),
              title: () => renderTitle(e),
            }
          );
        } else {
          return h(
            ElMenuItem,
            {
              onClick: () => {
                context.emit("itemClick", e);
              },
              ...props.subMenuConfig,
              index: e.path,
            },
            {
              title: () => renderTitle(e),
            }
          );
        }
      });
    };
    return () =>
      h(
        ElMenu,
        {
          ...context.attrs,
          "on-open": (index: string, indexPath: string) => {
            context.emit("open", index, indexPath);
          },
          "on-Close": (index: string, indexPath: string) => {
            context.emit("close", index, indexPath);
          },
          "on-Select": (index: string, indexPath: string, item: IMenuData, routeResult: boolean) => {
            context.emit("select", index, indexPath);
          },
        },
        () => renderChildren(props.menuData)
      );
  },
});
</script>
