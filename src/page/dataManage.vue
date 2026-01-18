<template>
  <!-- 资产表 -->
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
       <el-row style="margin-top: 20px;">
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
          <el-form-item label="公司名称">
            <el-input v-model="queryForm.name" placeholder="公司名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryResult">查询</el-button>
          </el-form-item>
           <el-form-item>
            <el-button @click="openAddCompanyDialog">添加</el-button>
          </el-form-item>
          <el-form-item>
             <el-button type="primary" plain>更新所有价格</el-button>
          </el-form-item>
            <el-form-item>
              <el-button type="success" plain @click="clcikUpdateAllReport" :loading="updateLoad">更新全部报表</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="resultList" 
                border
                style="width: 100%">
                  <el-table-column prop="name"  label="公司名称" />
                  <el-table-column prop="code"  label="股票代码" />
                  <el-table-column prop="place"  label="交易所" />
                  <el-table-column prop="updateTime"  label="更新时间" />
                  <el-table-column fixed="right" label="操作">
                      <template slot-scope="scope">
                          <el-dropdown @command="handleCommand">
                          <span class="el-dropdown-link">
                            跳转<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="asset">资产数据</el-dropdown-item>
                            <el-dropdown-item command="liability">负债数据</el-dropdown-item>
                            <el-dropdown-item command="profit">利润数据</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <el-popconfirm title="确定删除吗？" @confirm="deleteCompany(scope.row)">
                          <el-button slot="reference" type="text" style="color:red">删除</el-button>
                        </el-popconfirm>
                        
                      </template>
                 </el-table-column>
        </el-table>
       </el-row><br/>
    </div>
    <el-dialog
      title="添加公司"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
        <el-form ref='companyForm' :rules="companyRules" :model="companyForm" label-width="80px">
          <el-form-item label="公司名称" prop="name">
            <el-input v-model="companyForm.name"></el-input>
          </el-form-item>
          <el-form-item label="股票代码" prop="code">
            <el-input v-model="companyForm.code"></el-input>
          </el-form-item>
          <el-form-item label="交易所" prop="place">
             <el-select v-model="companyForm.place" placeholder="请选择交易所">
              <el-option label="sz" value="sz"></el-option>
              <el-option label="sh" value="sh"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button type="primary" @click="submitCompany">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import headTop from '../components/headTop'
import { fetchCompanyList,addCompany,deleteCompany } from '../api/company';
import { updateAllReports } from '../api/stock';
  export default {
    components: {
    		headTop,
    	},
    mounted() {
     this.queryResult();
    },
    data() {
      return {
        queryForm: {
          name: ''
        },
        companyForm: {
          name: '',
          code: '',
          place: ''
        },
        resultList:[],
        dialogVisible: false,
        myChart:null,
        updateLoad:false,
        companyRules: {
          name: [
            { required: true, message: '请输入公司名称', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入股票代码', trigger: 'blur' }
          ],
          place: [
            { required: true, message: '请选择交易所', trigger: 'change' }
          ]
        }
      }
    },
     methods: {
      //点击删除
      deleteCompany(row){
        deleteCompany(row).then(response => {
          if(response.data.code=="0"){
            this.$message.success('删除公司成功');
            this.queryResult();
          }else{
            this.$message.error('删除公司失败:' + response.data.message);
          }
        }).catch(error => {
          this.$message.error('删除公司异常:', error);
        });
      },
      //点击查询
      queryResult() {
        fetchCompanyList(this.queryForm).then(response => {
          if(response.data.code=="0"){
            if( response.data.data.length>0 && response.data.data[0]!=null){
              this.resultList = response.data.data;
            }
          }else{
            this.$message.error('查询公司列表失败:' + response.data.message);
          }
          
        }).catch(error => {
          this.$message.error('查询公司列表异常:', error);
        });
      },
      //打开添加公司对话框
      openAddCompanyDialog() {
         this.companyForm = {
          name: '',
          code: '',
          place: ''
        };
        this.dialogVisible = true;
      },
      //提交添加公司
      submitCompany() {
        this.$refs['companyForm'].validate((valid) => {
          if (valid) {
             addCompany(this.companyForm).then(response => {
                if(response.data.code=="0"){
                  this.$message.success('添加公司成功');
                  this.dialogVisible = false;
                  this.dialogVisible = false
                  this.queryResult();
                }else{
                  this.$message.error('添加公司失败:' + response.data.message);
                }
              }).catch(error => {
                this.$message.error('添加公司异常:', error);
              });
          } else {
            this.$message.error('请填写完整的公司信息');
            return false;
          }
        });
       
      },
      clickUpdateAllPrice(){
        console.log('更新所有价格');
      },
      clcikUpdateAllReport(){
        this.updateLoad = true;
        updateAllReports().then(response => {
          if(response.data.code=="0"){
            this.$message.success('更新全部报表成功');
          }else{
            this.$message.error('更新全部报表失败:' + response.data.message);
          }
        }).catch(error => {
          this.$message.error('更新全部报表异常:', error);
        }).finally(()=>{
          this.updateLoad = false;
        });
      },
      cancelSubmit() {
        this.companyForm = {
          name: '',
          code: '',
          place: ''
        };
        this.dialogVisible = false;
      },
      handleClose(done) {
        done();
        this.companyForm = {
          name: '',
          code: '',
          place: ''
        };
        console.log('关闭对话框');
      },
      handleCommand(command) {
        if (command === 'asset') {
          this.$router.replace('/assetManage');
        } else if (command === 'liability') {
          this.$router.replace('/liabilityManage');
        } else if (command === 'profit') {
          this.$router.replace('/profitManage');
        }
    }
  }
  }
</script>
<style lang="less" scoped>
	@import '../style/mixin';
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .table_container{
    padding: 10px;
  }
</style>