<template>
  <!-- 资产表 -->
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
       <el-row style="margin-top: 20px;">
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
          <el-form-item label="股票代码">
            <el-input v-model="queryForm.code" placeholder="股票代码"></el-input>
          </el-form-item>
          <el-form-item label="公司名称">
            <el-input v-model="queryForm.name" placeholder="公司名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryResult">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
                :data="resultList" 
                border
                style="width: 100%">
                  <el-table-column prop="name"  label="名称" />
                  <el-table-column prop="shortTermBorrowing"  label="短期借款" />
                  <el-table-column prop="profitLossLiabilities"  label="计入当期损益的金融负债" />
                  <el-table-column prop="accountsPayable"  label="应付账款" />
                  <el-table-column prop="advanceFromCustomers"  label="预收账款" />
                  <el-table-column prop="contractLiability"  label="合同负债" />
                  <el-table-column prop="otherPayables"  label="其他应付款" />
                  <el-table-column prop="oneYearNonCurrentLiabilities"  label="一年期非流动负债" />
                  <el-table-column prop="otherCurrentLiabilities"  label="其他流动负债" />
                  <el-table-column fixed="right" label="操作" width="100">
                      <template slot-scope="scope">
                         <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                      </template>
                 </el-table-column>
        </el-table>
       </el-row>
    </div>
    <el-dialog
      title="公司名称-股票代码"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
     <!-- 走马灯显示4张表 -->
        <el-row>
          <el-col :span="8">短期借款：</el-col>
          <el-col :span="8">计入当期损益的金融负债：</el-col>
          <el-col :span="8">应付账款：</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">预收账款：</el-col>
          <el-col :span="8">合同负债：</el-col>
          <el-col :span="8">其他应付款：</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">一年期非流动负债：</el-col>
          <el-col :span="8">其他流动负债：</el-col>
          <el-col :span="8">长期借款：</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">应付债券：</el-col>
          <el-col :span="8">长期应付款：</el-col>
          <el-col :span="8">预计负债：</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">其他非流动负债：</el-col>
          <el-col :span="8">负债合计：</el-col>
          <el-col :span="8">归母所有者权益：</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">股本：</el-col>
          <el-col :span="8">现价：</el-col>
          <el-col :span="8">市场价值：</el-col>
        </el-row>
        

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
 import headTop from '../components/headTop'
  export default {
    components: {
    		headTop,
    	},
    mounted() {
      
    },
    data() {
      return {
        queryForm: {
          code: '',
          name: '',
          dateTime:''
        },
        resultList:[{name:'潍柴动力',shortTermBorrowing:'1000.00',profitLossLiabilities:'500.00',accountsPayable:'800.00',advanceFromCustomers:'300.00',contractLiability:'250.00',otherPayables:'150.00',oneYearNonCurrentLiabilities:'225.00',otherCurrentLiabilities:'175.00'},],
        dialogVisible: false,
      }
    },
     methods: {
      //点击查询
      queryResult() {
        console.log('submit!');
      },
      //点击详情
      handleClick(data){
        this.dialogVisible = true;

      },
      handleClose(done) {
        done();
        console.log('关闭对话框');
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