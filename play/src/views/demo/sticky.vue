<template>
  <!-- <div>基础吸底(ok)：</div>
  <div class="h-300px overflow-auto border px-[10px] py-[10px] border-dark-200">
    <div class="h-800px bg-dark-50 px-[10px] py-[10px]">
      <div class="bg-light-500 h-200px"></div>
      <div class="bg-light-500 h-200px mt-[10px]"></div>
      <div class="bg-light-500 h-200px mt-[10px] mb-[10px]"></div>
      <yto-c-sticky :offset-bottom="0" position="bottom" :inGlobal="false" class="bg-yellow-400">
        <el-button type="warning" style="margin-left: 25px">sticky bottom button</el-button>
      </yto-c-sticky>
    </div>
  </div> -->

  <!-- <div>基础吸顶(ok)：</div>
  <div class="h-400px overflow-auto border px-[10px] py-[10px] border-dark-200">
    <div class="h-800px bg-dark-50 px-[10px] py-[10px]">
      <div style="height: 250px; background-color: #f1f1f1">
        <yto-c-sticky :offsetTop="10" :inGlobal="true">
          <el-button type="error" style="margin-left: 25px">sticky basic</el-button>
        </yto-c-sticky>
      </div>
    </div>
  </div> -->

  <!-- <div>吸顶指定容器（ok）：</div>
  <div class="h-400px overflow-auto border px-[10px] py-[10px] border-dark-200">
    <div class="h-800px bg-dark-50 px-[10px] py-[10px]">
      <div ref="container" style="height: 250px; background-color: #f1f1f1">
        <yto-c-sticky :container="container" :offsetTop="0" :inGlobal="false">
          <el-button type="primary" style="margin-left: 25px">sticky top button for container</el-button>
        </yto-c-sticky>
      </div>
    </div>
  </div> -->

  <div>吸底指定容器：</div>
  <div class="h-400px overflow-auto border px-[10px] py-[10px] border-dark-200">
    <!-- <div class="h-800px bg-dark-50 px-[10px] py-[10px]">
      <div ref="container" style="height: 250px; background-color: #f1f1f1">
        <yto-c-sticky :container="container" position="bottom" :offset-bottom="0" :inGlobal="true">
          <el-button type="primary" style="margin-left: 25px">sticky bottom button for container</el-button>
        </yto-c-sticky>
      </div>
    </div> -->
    <div class="h-800px bg-dark-50 px-[10px] py-[10px]">
      <div class="bg-light-500 h-200px"></div>
      <div class="bg-light-500 h-200px mt-[10px]"></div>
      <div class="bg-light-500 h-200px mt-[10px] mb-[10px]"></div>

      <div ref="container2" style="height: 250px; background-color: #2b84c9">
        <yto-c-sticky :container="container2" position="bottom" :offset-bottom="0" :inGlobal="false">
          <el-button type="primary">sticky bottom button for container</el-button>
        </yto-c-sticky>
      </div>

      <div class="bg-dark-500 h-900px"></div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
const container = ref(null);
const container2 = ref(null);
</script>

<style lang="scss"></style>
