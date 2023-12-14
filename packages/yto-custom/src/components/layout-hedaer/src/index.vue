<template>
  <div class="layout-header flex items-center px-4 h-12 leading-12">
    <div class="flex">
      <slot v-if="title || logo" name="left">
        <div class="left-header flex items-center" :class="collapse ? 'disappear' : 'appear'">
          <img v-if="logo" class="w-[30px] h-[30px] mr-[10px]" :src="logo" alt="logo" />
          <span class="title overflow-hidden whitespace-nowrap">{{ title }}</span>
        </div>
      </slot>
    </div>
    <div class="flex flex-1">
      <slot>
        <div class="flex items-center">
          <i
            class="icon iconfont cursor-pointer"
            :class="collapse ? 'layout-icon_daohangzhankai' : 'layout-icon_daohangshouqi'"
            @click="onCollapse"
          ></i>
        </div>
      </slot>
    </div>
    <slot v-if="user" name="right">
      <div class="flex items-center text-[14px] text-[#fff]">
        <div class="mr-[5px]">{{ user.userName }}</div>
        <div class="mr-[10px]">（{{ user.userCode }}）</div>
        <i
          v-if="isfullscreen"
          class="icon iconfont cursor-pointer mx-[25px] !text-[14px] text-[#fff]"
          :class="fullscreen ? 'layout-icon_guanbiquanju' : 'layout-icon_kaiqiquanju'"
          @click="onFullScreen"
        ></i>
        <slot name="logout">
          <div class="flex items-center cursor-pointer text-[#fff]" @click="onLogout">
            <span class="mr-[5px]">退出</span> <el-icon size="16"><SwitchButton /></el-icon>
          </div>
        </slot>
      </div>
    </slot>
  </div>
</template>
<script lang="ts" setup name="LayoutHeader">
import { ref } from "vue";
import { ElIcon } from "element-plus";
import { SwitchButton } from "@element-plus/icons-vue";
import { session } from "gold-core";
import { EnumSessionKey } from "@/common/EnumConstant";
import useFullScreen from "@/composable/fullScreen";
import "@/icon-font/iconfont.css";

const props = defineProps({
  title: String,
  logo: String,
  collapse: Boolean,
  isfullscreen: {
    type: Boolean,
    default: true,
  },
  userInfo: {
    type: Object,
    default: () => {},
  },
});
const $emit = defineEmits(["logout", "collapse", "fullscreen"]);
const user = ref<any>(props.userInfo ? props.userInfo : session.get(EnumSessionKey.Session_User));
function onLogout(): void {
  $emit("logout");
  session.clear();
}
//处理折叠事件
function onCollapse(): void {
  setTimeout(() => {
    const el: any = document.querySelector(" .layout-header .left-header .title");
    el && (el.style.display = props.collapse ? "none" : "block");
  }, 150);

  $emit("collapse");
}
// 处理全屏事件
const { toggleFullScreen } = useFullScreen();
const fullscreen = ref(false);
function onFullScreen(): void {
  toggleFullScreen();
  $emit("fullscreen");
}
const KeyDown = (event: any) => {
  if (event.keyCode === 122) {
    event.returnValue = false;
    toggleFullScreen(); //触发全屏的方法
  }
};
window.addEventListener("keydown", KeyDown, true);
document.addEventListener("fullscreenchange", () => {
  fullscreen.value = !unref(fullscreen); //你要切换得图标使用得属性
});
</script>
<style lang="scss" scoped>
.layout-header {
  --layout-header-text-color: #fff;
  --layout-header-background: #409eff;
  --layout-header-left-width: 200px;
  --layout-header-left-collapse-width: 60px;
  --layout-header-left-title-size: 20px;
  --display-title: "block";
  background: var(--layout-header-background);
  color: var(--layout-header-text-color);
  .left-header {
    &.disappear {
      animation: cutWidth 0.4s;
      width: var(--layout-header-left-collapse-width);
    }
    &.appear {
      animation: addWidth 0.4s;
      width: var(--layout-header-left-width);
    }
    .title {
      font-size: var(--layout-header-left-title-size);
      display: var(--display-title);
    }
  }
}
@keyframes cutWidth {
  0% {
    width: var(--layout-header-left-width);
  }
  100% {
    width: var(--layout-header-left-collapse-width);
  }
}
@keyframes addWidth {
  0% {
    width: var(--layout-header-left-collapse-width);
  }

  100% {
    width: var(--layout-header-left-width);
  }
}
</style>
