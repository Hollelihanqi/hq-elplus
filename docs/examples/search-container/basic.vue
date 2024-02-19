<!--
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-19 15:52:25
 * @LastEditTime: 2024-02-19 10:52:24
-->
<template>
  <div class="m-4">
    <el-form label-width="80px">
      <yto-c-search-container :item-min-width="200" label-width="50px">
        <el-form-item label="测试" data-cols="2">
          <el-input placeholder="请输入" />
        </el-form-item>
        <el-form-item label="测试">
          <el-input placeholder="请输入" />
        </el-form-item>
        <el-form-item label="测试">
          <el-input placeholder="请输入" />
        </el-form-item>
        <el-form-item label="测试">
          <el-input placeholder="请输入" />
        </el-form-item>
        <!-- <el-form-item  class="sm:w-[100%] md:w-[50%] lg:w-[33.3%] xl:w-[60%] 2xl:w-[50%]" label="Activity name">
          <el-input placeholder="请输入啊啊啊"/>
        </el-form-item> -->
        <template #operation>
          <el-button size="small">重置</el-button>
          <el-button size="small" type="primary">搜索</el-button>
        </template>
      </yto-c-search-container>
    </el-form>
  </div>
</template>
<script setup lang="ts"></script>
