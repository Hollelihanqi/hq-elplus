import { computed } from "vue";
import { useData } from "vitepress";

export const useNav = () => {
  return computed(() => {
    // return theme.value.nav[lang.value]
    return "主题";
  });
};
