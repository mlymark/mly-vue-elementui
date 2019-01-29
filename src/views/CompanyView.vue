<template>
  <div class="company-view">
    <div class="breadcrumb-bar">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>企业管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-content">
      <div class="data-list">
        <div class="table-header">
          <el-button size="medium" icon="el-icon-search" @click="search">搜索</el-button>
          <el-input v-model.trim="searchName" placeholder="企业名称"></el-input>
          <el-input v-model.trim="searchCode" placeholder="企业代码"></el-input>
          <el-button size="medium" icon="el-icon-refresh" @click="reset">重置</el-button>
          <el-button type="success" circle size="medium" icon="el-icon-plus" @click="redirectAddPage"></el-button>
          <el-button v-show="isSelect" circle type="danger" icon="el-icon-delete" @click="confirmDelete"></el-button>
        </div>
        <el-table
          :data="companys"
          v-loading="loading"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="企业名称">
          </el-table-column>
          <el-table-column
            prop="shortName"
            label="简称">
          </el-table-column>
          <el-table-column
            prop="companyCode"
            label="企业代码">
          </el-table-column>
          <el-table-column
            prop="companyType"
            label="企业类型">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.companyType === 0">
                {{ scope.row.companyType | companyType }}
              </el-tag>
              <el-tag type="success" v-if="scope.row.companyType === 1">
                {{ scope.row.companyType | companyType }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            label="创建时间">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.createTime | formatDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="企业状态">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.status === 0">
                {{ scope.row.status | companyStatus }}
              </el-tag>
              <el-tag type="success" v-if="scope.row.status === 1">
                {{ scope.row.status | companyStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-footer" v-if="totalElements !== 0">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="currentSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalElements">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCompanyList, deleteCompanys } from '../api/company'
import { formatDate } from '../commons/filters/date'
import QS from 'qs'

export default {
  name: 'company-list',
  data () {
    return {
      companys: [],
      currentPage: 0,
      currentSize: 10,
      totalElements: 0,
      totalPages: 0,
      searchName: '',
      searchCode: '',
      loading: false,
      isSelect: false,
      selections: []
    }
  },
  created () {
    this.initData(0, 10)
  },
  methods: {
    redirectAddPage () {
      this.$router.push({
        name: 'addCompany'
      })
    },
    handleSelectionChange (val) {
      if (val.length > 0) {
        this.isSelect = true
      } else {
        this.isSelect = false
      }
      this.selections = val
    },
    initData (page, size) {
      this.loading = true
      const params = {
        page: page,
        size: size
      }
      getCompanyList(params).then(res => {
        this.companys = res.data.content
        this.currentPage = res.data.number + 1
        this.currentSize = res.data.size
        this.totalPages = res.data.totalPages
        this.totalElements = res.data.totalElements
        this.loading = false
      }, err => {
        console.log(err)
        this.loading = false
        this.$message.error(err.msg)
      })
    },
    search () {
      if (this.searchName || this.searchCode) {
        this.loading = true
        var params = {
          searchName: this.searchName,
          searchCode: this.searchCode,
          page: 0,
          size: this.currentSize
        }
        getCompanyList(params).then(res => {
          this.companys = res.data.content
          this.loading = false
        }, err => {
          console.log(err)
          this.loading = false
          this.$message.error(err.msg)
        })
      }
    },
    reset () {
      this.searchName = ''
      this.searchCode = ''
      this.initData(0, 10)
    },
    handleCurrentChange (val) {
      console.log(val)
      if (val !== this.currentPage) {
        this.initData(val - 1, this.currentSize)
      }
    },
    handleSizeChange (val) {
      if (val !== this.currentSize) {
        this.initData(0, val)
      }
    },
    confirmDelete () {
      this.$confirm('确认删除选择选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete()
      })
    },
    delete () {
      var ids = []
      this.selections.forEach((item, index) => {
        ids.push(item.id)
      })
      console.log(ids)
      var data = {
        id: ids
      }
      var params = QS.stringify(data, {indices: false})
      console.log(params)
      deleteCompanys(ids).then(res => {
        if (res.code === 0) {
          this.$message.success('数据删除成功!')
          this.initData(this.currentPage - 1, this.currentSize)
        } else {
          this.$message.error('数据删除失败!')
        }
      }, err => {
        this.$message.error(err)
      })
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd HH:mm')
    },
    companyType (type) {
      return type ? '多品种盐生产企业' : '食盐定点生产企业'
    },
    companyStatus (status) {
      return status ? '已激活' : '未激活'
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
  .company-view {
    .main-content {
      margin-top: 10px;
      .data-list {
        .table-header {
          button {
            display: inline-block;
          }
          .el-input {
            width: 200px;
            display: inline-block;
          }
        }
        .table-footer {
          height: 57px;
          width: 100%;
          background-color: #e6e6e6;
          .el-pagination {
            float: right;
            vertical-align: middle;
            margin-top: 12px;
            margin-right: 20px;
          }
        }
      }
    }
  }
</style>
