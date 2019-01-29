<template>
  <div class="dashboard-view">
    <div class="breadcrumb-bar">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>控制面板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-content">
      后台控制面板
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard'
}
</script>

<style lang="scss" type="text/scss" scoped>
  .dashboard-view {
    .main-content {
      margin-top: 10px;
    }
  }
</style>
