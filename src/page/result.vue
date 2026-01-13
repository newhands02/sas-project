<template>
  <!-- 结果查询表 -->
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
       <el-row style="margin-top: 20px;">
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
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
                  <el-table-column prop="reportDate"  label="报告期" />
                  <el-table-column prop="adjustCash"  label="现金调整项" />
                  <el-table-column prop="bondCost"  label="债权成本" />
                  <el-table-column prop="profitAdjustExcept"  label="预期利润调整项" />
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
      :title="currentDate.name + '-' + currentDate.reportDate"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
        <el-row>
          <el-col :span="8">资金调整项：{{ currentDate.adjustCash }}</el-col>
          <el-col :span="8">债权成本：{{ currentDate.bondCost }}</el-col>
          <el-col :span="8">预期利润调整项：{{ currentDate.profitAdjustExcept }}</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">资本开支：{{ currentDate.capitalExpenditure }}</el-col>
          <el-col :span="8">调整后利润：{{ currentDate.profitAdjust }}</el-col>
          <el-col :span="8">调整后净资产：{{ currentDate.adjustedNetAssets }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">净现金：{{ currentDate.netCash }}</el-col>
          <el-col :span="8">ROE-15：{{ currentDate.roe15 }}</el-col>
          <el-col :span="8">PE：{{ currentDate.pe }}</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">PB：{{ currentDate.pb }}</el-col>
          <el-col :span="8">PE/ROE：{{ currentDate.pedroe }}</el-col>
          <el-col :span="8">应收/营收比：{{ currentDate.ardrr }}</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">权益乘数：{{ currentDate.equityMultiplier }}</el-col>
          <el-col :span="8">毛利率：{{ currentDate.grossProfitMargin }}</el-col>
          <el-col :span="8">当期-利润现金流：{{ currentDate.profitCashFlowCurrent }}</el-col>
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
 import { fetchResultList } from '../api/stock';
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
          name: '',
        },
        resultList:[],
        currentDate:{},
        dialogVisible: false,
      }
    },
     methods: {
      //点击查询
      queryResult() {
        fetchResultList(this.queryForm).then(response => {
          if(response.data.code=="0"){
            this.resultList = response.data.data;
          }else{
            this.$message.error('查询结果列表失败:' + response.data.message);
          }
          
        }).catch(error => {
          this.$message.error('查询结果列表异常:', error);
        });
      },
      //点击详情
      handleClick(data){
        this.currentDate = data;
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