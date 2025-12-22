<template>
  <!-- 结果查询表 -->
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
                  <el-table-column prop="place"  label="交易所" />
                  <el-table-column prop="code"  label="股票代码" />
                  <el-table-column prop="datetime"  label="报告期" />
                  <el-table-column prop="cashAdjust"  label="现金调整项" />
                  <el-table-column prop="debtCost"  label="债权成本" />
                  <el-table-column prop="expectedProfitAdjustmentItem"  label="预期利润调整项" />
                  <el-table-column prop="capitalExpenditure"  label="资本开支" />
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
          <el-col :span="8">资金调整项：</el-col>
          <el-col :span="8">债权成本：</el-col>
          <el-col :span="8">预期利润调整项：</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">资本开支：</el-col>
          <el-col :span="8">调整后利润：</el-col>
          <el-col :span="8">调整后净资产：</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">净现金：</el-col>
          <el-col :span="8">ROE-15：</el-col>
          <el-col :span="8">PE：</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">PB：</el-col>
          <el-col :span="8">PE/ROE：</el-col>
          <el-col :span="8">应收/营收比：</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">权益乘数：</el-col>
          <el-col :span="8">毛利率：</el-col>
          <el-col :span="8">当期-利润现金流：</el-col>
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
        resultList:[{name:'中国平安',place:'深交所',code:'000001',datetime:'2023-03-31'},
                    {name:'贵州茅台',place:'上交所',code:'600519',datetime:'2023-03-31'},
                    {name:'招商银行',place:'上交所',code:'600036',datetime:'2023-03-31'}],
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