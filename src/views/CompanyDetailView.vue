<template>
  <div calss="companydetail-view">
    <div class="breadcrumb-bar">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'company' }">企业管理</el-breadcrumb-item>
        <el-breadcrumb-item>企业详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-content">
      企业详情{{id}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  props: {
    id: Number
  }
}
</script>

<style lang="scss">
</style>
