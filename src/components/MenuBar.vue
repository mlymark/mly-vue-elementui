<template>
  <div class="menu-bar">
    <div class="collapse-control" :width="menuHeaderWidth+'px'">
      <div class="logo"></div>
      <span class="title">食盐追溯</span>
    </div>
    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router="router"
             :collapse-transition="collapseTransition" :unique-opened="uniqueOpened"
             :collapse="collapse">
      <el-menu-item index="company">
        <i class="el-icon-menu"></i>
        <span slot="title">企业管理</span>
      </el-menu-item>
      <el-menu-item index="product">
        <i class="el-icon-document"></i>
        <span slot="title">产品管理</span>
      </el-menu-item>
      <el-submenu index="batch">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">批次管理</span>
        </template>
        <el-menu-item index="3-1">选项3</el-menu-item>
        <el-submenu index="3-2">
          <span slot="title">选项4</span>
          <el-menu-item index="3-2-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'menu-bar',
  props: {
    collapse: Boolean,
    menuHeaderWidth: Number
  },
  data () {
    return {
      collapseTransition: false,
      uniqueOpened: true,
      router: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  .menu-bar {
    .collapse-control {
      height: 60px;
      border-right: 1px solid #40aaff;
      .logo {
        display: inline-block;
        width: 65px;
        height: 60px;
        vertical-align: middle;
        background-image: url('../assets/image/logo.png');
        background-size: contain;
      }
      .title {
        display: inline-block;
        margin-left: 10px;
        font-size: 20px;
        color: #40aaff;
      }
    }
  }

</style>
