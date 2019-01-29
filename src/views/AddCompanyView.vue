<template>
  <div class="add-company-view">
    <div class="breadcrumb-bar">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'company' }">企业管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加企业</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-content">
      <div class="form-view">
        <div class="form-header">录入企业信息</div>
        <div class="form-data">
          <el-form ref="companyForm" :rules="rules" :model="companyForm" label-width="80px" class="register-form">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="companyForm.name"></el-input>
            </el-form-item>
            <el-form-item label="简称" prop="shortName">
              <el-input v-model="companyForm.shortName"></el-input>
            </el-form-item>
            <el-form-item label="企业代码" prop="companyCode">
              <el-input v-model="companyForm.companyCode"></el-input>
            </el-form-item>
            <el-form-item label="企业类型" prop="companyType">
              <el-select v-model="companyForm.companyType" placeholder="请选择" style="width: 100%;">
                <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否激活" prop="status">
              <el-radio v-model="companyForm.status" :label="1">激活</el-radio>
              <el-radio v-model="companyForm.status" :label="0">禁用</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button class="submit" :disabled="isDisabled" :class="{disabled: isDisabled}"
                         @click="submitForm('companyForm')" style="width: 100%;"
                         type="primary">{{btnState}}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addCompany } from '../api/company'

export default {
  name: 'addCompany',
  data () {
    return {
      companyForm: {
        name: '',
        shortName: '',
        companyCode: '',
        companyType: 0,
        status: 0
      },
      options: [{
        label: '食盐定点生产企业',
        value: 0
      }, {
        label: '多品种盐生产企业',
        value: 1
      }],
      rules: {
        name: [
          {required: true, message: '请输入企业名称', trigger: 'blur'}
        ],
        shortName: [
          {required: true, message: '请输入企业简称', trigger: 'blur'}
        ],
        companyCode: [
          {required: true, message: '请确认密码', trigger: 'blur'},
          {pattern: /^[0-9]{6,10}$/, message: '只能输入6-10数字'}
        ],
        companyType: [
          {required: true, message: '请选择企业类型', trigger: 'blur'}
        ]
      },
      isShow: 0,
      isDisabled: false,
      btnState: '立即创建'
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addCompany(this.companyForm).then(res => {
            if (res.code === 0) {
              this.$router.push({
                name: 'company'
              })
            } else {
              this.$message.error(res.msg)
            }
          }, err => {
            this.$message.error(err)
          })
        } else {
          return false
        }
      })
    }
  },
  computed: {}
}
</script>

<style lang="scss" type="text/scss" scoped>
  .add-company-view {
    .main-content {
      width: 100%;
      margin-top: 10px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .form-view {
        width: 400px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-top: 10px;
        .form-header {
          height: 50px;
          font-size: 30px;
          text-align: center;
          margin-bottom: 20px;
          color: #40aaff;
          font-weight: 800;
        }
      }
    }
  }
</style>
