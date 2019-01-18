<template>
  <div class="register-view">
    <el-form ref="userForm" :rules="rules" :model="userForm" label-width="80px" class="register-form">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="userForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input type="password" v-model="userForm.confirmPwd"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop="phoneNumber">
        <el-input v-model="userForm.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submit" :disabled="isDisabled" :class="{disabled: isDisabled}"
                   @click="submitForm('userForm')"
                   type="primary">{{registerState}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data () {
    return {
      userForm: {
        name: '',
        password: '',
        confirmPwd: '',
        phoneNumber: '',
        email: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入用户名称', trigger: 'blur'},
          {pattern: /^[a-zA-Z](\w){1,10}$/, message: '以字母开头，长度在2-10之间， 只能包含字符、数字和下划线'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {pattern: /^(\w){6,20}$/, message: '只能输入6-20个字母、数字、下划线'}
        ],
        confirmPwd: [
          {required: true, message: '请确认密码', trigger: 'blur'},
          {pattern: /^(\w){6,20}$/, message: '只能输入6-20个字母、数字、下划线'},
          {
            validator: (rule, value, callback) => {
              console.log(this.userForm.password)
              if (value !== this.userForm.password) {
                callback(new Error('密码不匹配'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        phoneNumber: [
          {required: true, message: '请输入电话号码', trigger: 'blur'},
          {pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱格式不正确'}
        ]
      },
      isShow: 0,
      isDisabled: false,
      registerState: '注册'
    }
  },
  computed: {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push({
            name: 'login'
          })
        } else {
          return false
        }
      })
    }
  },
  watch: {}
}
</script>

<style>
  .register-view {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
  }

  .register-form {

  }

  .register-form .el-form-item button {
    width: 100%;
  }
</style>
