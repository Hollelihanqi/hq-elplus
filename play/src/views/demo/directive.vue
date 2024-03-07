<template>
  <div>
    <h2>复制指令</h2>
    <el-divider content-position="left">
      <el-button type="primary" v-copy="'我是复制的内容'">打我</el-button>
    </el-divider>
    <hr/>
    <h2>监听元素大小变化</h2>
    <div class="w-full h-full  text-center bg-[#4396fc] h-[10%]" v-resize-element="handle">
      宽度:{{el?.width}}<br>
      高度：{{el?.height}}
    </div>
    <hr/>
    <h2>水印指令</h2>
    <div v-waterMarker="{text:'版权所有',textColor:'rgba(180, 180, 180, 0.4)'}" class="w-full h-[200px]"></div>

  </div>


</template>

<script setup lang="ts">
import {reactive} from "vue";

const el:any = ref()

const handle = (e:any)=>{
  el.value = e
  // el.value = e;
  console.log('000000000000',el.value);
}

</script>

<style scoped>

</style>
