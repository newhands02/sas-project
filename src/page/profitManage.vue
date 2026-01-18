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
        </el-form>
        <el-table
                :data="resultList" 
                border
                style="width: 100%">
                  <el-table-column prop="name"  label="名称" />
                  <el-table-column prop="operatingRevenue"  label="营业收入" />
                  <el-table-column prop="goodsSoldCost"  label="营业成本" />
                  <el-table-column prop="salesExpenses"  label="销售费用" />
                  <el-table-column prop="administrativeExpenses"  label="管理费用" />
                  <el-table-column prop="rdExpense"  label="研发费用" />
                  <el-table-column prop="financialExpenses"  label="财务费用" />
                  <el-table-column prop="netProfitCurrent"  label="当期净利润" />
                  <el-table-column prop="netProfit"  label="净利润" />
                  <el-table-column fixed="right" label="操作" width="100">
                      <template slot-scope="scope">
                         <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                      </template>
                 </el-table-column>
        </el-table>
       </el-row><br/>
       <div id="profitChart" style="height:350px;"></div>
    </div>
    <el-dialog
      :title="currentData.name + '-' + currentData.reportTime"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
     <!-- 走马灯显示4张表 -->
        <el-row>
          <el-col :span="8">营业收入：{{ currentData.operatingRevenue }}</el-col>
          <el-col :span="8">营业成本：{{ currentData.goodsSoldCost }}</el-col>
          <el-col :span="8">销售费用：{{ currentData.salesExpenses }}</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">管理费用：{{ currentData.administrativeExpenses }}</el-col>
          <el-col :span="8">研发费用：{{ currentData.rdExpense }}</el-col>
          <el-col :span="8">财务费用：{{ currentData.financialExpenses }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">当期净利润：{{ currentData.netProfitCurrent }}</el-col>
          <el-col :span="8">净利润：{{ currentData.netProfit }}</el-col>
          <el-col :span="8">经营活动现金净额：{{ currentData.operatingActivitiesNetCash }}</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">年资本开支：{{ currentData.annualCapitalExpenditure }}</el-col>
          <el-col :span="8">年折旧与摊销：{{ currentData.annualDepreciationAmortization }}</el-col>
          <el-col :span="8">利润调增：{{ currentData.profitIncrease }}</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">资产调增：{{ currentData.assetAdjustmentIncrease }}</el-col>
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
 import { getProfitsList } from '../api/getData';
  import * as echarts from 'echarts'
 import { profitX,updateEchartData,getChartOption,getUpdateOption } from '../config/echartConst';
  export default {
    components: {
    		headTop,
    	},
    mounted() {
      this.profitChart = echarts.init(document.getElementById('profitChart'));
      this.initChart();
      console.log('利润数据查询页面加载完成');
      this.queryResult();
    },
    data() {
      return {
        queryForm: {
          name: ''
        },
        resultList:[],
        dialogVisible: false,
        currentData:{},
        profitChart:null,
      }
    },
     methods: {
      handleRowDbClick(row, column, event){
       this.currentData = row;
       this.updateEchartData(row);
      },
       updateEchartData(originList){
        if(this.profitChart){
          let sdata = updateEchartData(originList);
          let option = getUpdateOption(originList,sdata,profitX);
          this.profitChart.setOption(option);
        }

      },
      //点击查询
      queryResult() {
        getProfitsList(this.queryForm).then(response => {
          if(response.data.code=="0"){
            if( response.data.data.length>0 && response.data.data[0]!=null){
              this.resultList = response.data.data;
              this.currentData = this.resultList[0];
              this.updateEchartData(this.resultList[0]);
            }
          }else{
            this.$message.error('查询利润列表失败:' + response.data.message);
          }
          
        }).catch(error => {
          this.$message.error('查询利润列表异常:', error);
        });
      },
      //点击详情
      handleClick(data){
        this.currentData = data;
        this.dialogVisible = true;

      },
      handleClose(done) {
        done();
        console.log('关闭对话框');
      },
      //初始化图表
      initChart(){
        let option = getChartOption('');
        this.profitChart.setOption(option);
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