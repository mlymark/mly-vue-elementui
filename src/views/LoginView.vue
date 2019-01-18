<template>
  <div class="login-view">
    <el-card class="login-card" body-style="width:100%">
      <div class="login-header">
        <strong>登录</strong>
      </div>
      <el-form class="login-form">
        <el-form-item>
          <el-input id="name" v-model="name" type="text" prefix-icon="fa fa-user" name="name"
                    placeholder="用户名">
          </el-input>
        </el-form-item>
        <el-form-item>
          <template v-if="isShow === 0">
            <el-input v-model="password" type="password" name="password" prefix-icon="fa fa-key"
                      placeholder="请输入密码">
              <i class="fa fa-eye-slash" slot="suffix" @click="showPwd()"></i>
            </el-input>
          </template>
          <template v-if="isShow === 1">
            <el-input v-model="password" type="text" name="password" prefix-icon="fa fa-key"
                      placeholder="请输入密码">
              <i class="fa fa-eye" slot="suffix" @click="showPwd()"></i>
            </el-input>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" :disabled="isDisabled" :class="{disabled: isDisabled}"
                     @click="submitForm"
                     type="primary">{{loginState}}
          </el-button>
        </el-form-item>
        <el-form-item>
          <router-link :to="{name: 'register'}">注册</router-link>
          <router-link :to="{name: 'forget'}">忘记密码？</router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { toLogin } from '../api/api'

export default {
  name: 'login',
  data () {
    return {
      name: '',
      password: '',
      isShow: 0,
      isDisabled: false,
      loginState: '登录',
      error: ''
    }
  },
  computed: {},
  methods: {
    showPwd: function () {
      this.isShow = this.isShow ? 0 : 1
    },
    beforeSubmit: function () {
      // console.log('Submiting...')
      this.isDisabled = true
      this.loginState = '正在登录...'
    },
    onSuccess: function (res) {
      // console.log('complete!')
      if (res.code === 0 && res.data) {
        this.$store.commit('updateLoginData', res.data)
        localStorage.setItem('userName', res.data.userName)
        localStorage.setItem('token', res.data.token)
        this.$router.push({name: 'home'})
      } else {
        //  this.error = res.msg
        this.loginState = '登录'
        this.isDisabled = false
        this.$message.error(res.msg)
      }
    },
    onError: function (err) {
      console.log(err)
      this.loginState = '登录'
      this.isDisabled = false
    },
    submitForm: function () {
      if (this.name && this.password) {
        this.beforeSubmit()
        toLogin({
          username: this.name,
          password: this.password
        }).then(res => {
          console.log(res)
          this.onSuccess(res)
        }, err => {
          console.log(err)
          this.onError(err)
        })
      } else {
        this.$message.warning('请填写登录信息！')
      }
    }
  }
}
</script>

<style lang="scss">
  .login-view {
    margin-top: 220px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-direction: row;
  }

  .login-form {
    margin-top: 10px;
  }

  .login-card {
    display: flex;
    justify-content: center;
    width: 500px;
    height: 350px;
  }

  .login-header {
    height: 40px;
    margin-top: 10px;
    border-bottom: 1px solid #ebeef5;

  }

  .login-form .el-form-item {
    margin: 20px 0;
  }

  .login-form .el-form-item button {
    width: 100%;
  }

  .login-form .el-form-item a {
    text-decoration: none;
  }

</style>
