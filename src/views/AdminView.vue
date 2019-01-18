<template>
  <el-container class="admin-view">
    <el-aside :width="sideWidth+'px'">
      <menu-bar :collapse="isCollapse" :menuHeaderWidth="sideWidth"></menu-bar>
    </el-aside>
    <el-container>
      <el-header>
        <header-bar @switch="handleSideSwitch"></header-bar>
      </el-header>
      <breadcrumb-bar></breadcrumb-bar>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderBar from '../components/HeaderBar'
import MenuBar from '../components/MenuBar'
import BreadcrumbBar from '../components/BreadcrumbBar'

export default {
  name: 'admin',
  data () {
    return {
      sideWidth: 200,
      isCollapse: false
    }
  },
  components: {HeaderBar, MenuBar, BreadcrumbBar},
  methods: {
    handleSideSwitch (val) {
      this.isCollapse = val
      this.sideWidth = val ? 65 : 200
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  .admin-view {
    .el-header {
      background-color: #40aaff;
    }
  }
</style>
