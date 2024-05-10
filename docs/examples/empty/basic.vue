<template>
  <div class="p-4">
    <h3>基本使用</h3>
    <yto-c-empty> </yto-c-empty>
  </div>
  <div class="p-4">
    <h3>调整尺寸</h3>
    <yto-c-empty size="large"> </yto-c-empty>
    <yto-c-empty size="small"> </yto-c-empty>
    <yto-c-empty size="mini"> </yto-c-empty>
    <h3>自定义大小</h3>
    <yto-c-empty size="small" :small-size="{ width: '300px', height: '150px' }"> </yto-c-empty>
  </div>
  <div class="p-4">
    <h3>自定文字</h3>
    <yto-c-empty desc="我比较有个性，一般不会认可别人写的东西，只认可自己"> </yto-c-empty>
  </div>
</template>
