<template>
  <div class="header-bar">
    <i @click="handleCollapse" class="slide-control fa fa-angle-double-left"
       :class="{'fa-angle-double-right':isCollapse,'fa-angle-double-left':!isCollapse}" aria-hidden="true"></i>
    <div class="user-info">
      <span class="avatar"
            :style="{backgroundImage: 'url(' + (avatar ? avatar : baseAvatar) + ')',backgroundSize:'contain'}">
      <!--<img :src="avatar" alt="头像">-->
      </span>
      <span class="username">
        {{userName}}
      </span>
      <i class="fa fa-cog" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>

export default {
  name: 'header-bar',
  computed: {},
  data () {
    return {
      userName: localStorage.getItem('userName'),
      avatar: '',
      baseAvatar: 'http://www.jf258.com/uploads/2014-09-09/120105693.jpg',
      isCollapse: false
    }
  },
  methods: {
    handleCollapse () {
      this.isCollapse = !this.isCollapse
      this.$emit('switch', this.isCollapse)
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  .header-bar {
    display: flex;
    flex-direction: row;
    .slide-control {
      line-height: 60px;
      font-size: 30px;
      color: #fff;
      cursor: Pointer;
    }
    .slide-control:hover {
      color: #06f;
    }
    .title {
      justify-content: flex-start;
      max-width: 200px;
      max-height: 60px;
      margin: 0px 20px;
      font-size: 25px;
      line-height: 60px;
      color: #fff;
      word-break: break-all;
      background-size: cover;
      a {
        color: #fff;
        text-decoration: none;
      }
    }
    .user-info {
      justify-content: flex-end;
      width: 200px;
      height: 60px;
      flex: 1;
      display: flex;
      .avatar {
        width: 40px;
        height: 40px;
        margin: 10px 0px;
        border-radius: 20px;
      }
      .username {
        margin: 0px 10px;
        line-height: 60px;
        color: #fff;
      }
      i {
        margin: 0 10px;
        line-height: 60px;
        color: #fff;
        cursor: Pointer;
      }
      i:hover {
        margin: 0 10px;
        line-height: 60px;
        color: #333;
      }
    }

  }
</style>
