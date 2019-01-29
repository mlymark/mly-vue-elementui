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
      <div>
        <i class="fa" :class="{'el-icon-caret-bottom':isDropDown,'el-icon-caret-right':!isDropDown}" aria-hidden="true"
           @click="switchDropDown"></i>
      </div>
      <transition name="fade">
        <div v-show="isDropDown" class="drop-down" @mouseleave="switchDropDown">
          <ul>
            <router-link tag="li" :to="{ path: 'home' }">用户信息</router-link>
            <router-link tag="li" :to="{ path: 'home' }">修改密码</router-link>
            <li @click="logout">退出账号</li>
          </ul>
        </div>
      </transition>
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
      isCollapse: false,
      isDropDown: false
    }
  },
  methods: {
    handleCollapse () {
      this.isCollapse = !this.isCollapse
      this.$emit('switch', this.isCollapse)
    },
    switchDropDown () {
      this.isDropDown = !this.isDropDown
    },
    logout () {
      localStorage.setItem('userName', '')
      localStorage.setItem('token', '')
      this.$router.push({
        name: 'login'
      })
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
      font-size: 25px;
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
      .drop-down {
        position: absolute;
        top: 60px;
        right: 10px;
        background-color: #fafafa;
        box-shadow: 0px 0px 6px 1px #9e9a9a;
        margin-top: 5px;
        z-index: 1000;
        ul {
          list-style: none;
          padding: 0px;
          width: 120px;
          li {
            border-bottom: 1px solid #efe5e5;
            width: 90px;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
            padding: 10px;
            font-size: 15px;
            cursor: pointer;
          }
          li:hover {
            background-color: aliceblue;
          }
        }
      }
    }

  }
</style>
