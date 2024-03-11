<template>
  <el-form>
    <el-row :gutter="16">
      <el-col :xs="11" :sm="9" :md="7" :lg="5" :xl="4">
        <el-form-item label="搜索表格">
          <el-input placeholder="请输入"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="11" :sm="9" :md="7" :lg="5" :xl="4">
        <el-form-item label="搜索表格">
          <el-input placeholder="请输入"></el-input>
        </el-form-item>
      </el-col>
      <el-col :xs="2" :sm="6" :md="3" :lg="4" :xl="4">
        <div class="flex justify-end">
          <el-button>重置</el-button>
          <el-button type="primary">查询</el-button>
          <el-button type="primary" link class="flex items-center">
            展开
            <el-icon class="el-icon--right">
              <component :is="collapsed ? ArrowDown : ArrowUp"></component>
            </el-icon>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts" setup>
import { ArrowDown, ArrowUp } from "@element-plus/icons-vue";
const collapsed = ref(false);
</script>
