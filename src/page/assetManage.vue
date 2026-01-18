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
                @row-dblclick="handleRowDbClick"
                style="width: 100%">
                  <el-table-column prop="name"  label="名称" />
                  <el-table-column prop="monetaryFunds"  label="货币资金" />
                  <el-table-column prop="tradingFinancialAssets"  label="交易性金融资产" />
                  <el-table-column prop="accountsNotesReceivable"  label="应收票据/应收账款" />
                  <el-table-column prop="prepayments"  label="预付款项" />
                  <el-table-column prop="totalOtherReceivables"  label="其他应收款合计" />
                  <el-table-column prop="inventory"  label="存货" />
                  <el-table-column prop="oneYearNonCurrentAssets"  label="一年期非流动资产" />
                  <el-table-column prop="otherCurrentAssets"  label="其他流动资产" />
                  <el-table-column fixed="right" label="操作" width="100">
                      <template slot-scope="scope">
                         <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                      </template>
                 </el-table-column>
        </el-table>
       </el-row><br/>
       <div id="assetChart" style="height:350px;"></div>
    </div>
    <el-dialog
      :title="currentData.name + '-' + currentData.reportTime"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
     <!-- 走马灯显示4张表 -->
        <el-row>
          <el-col :span="8">货币资金：{{ currentData.monetaryFunds }}</el-col>
          <el-col :span="8">交易性金融资产：{{ currentData.tradingFinancialAssets }}</el-col>
          <el-col :span="8">应收票据/应收账款：{{ currentData.accountsNotesReceivable }}</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">预付款项：{{ currentData.prepayments }}</el-col>
          <el-col :span="8">其他应收款合计：{{ currentData.totalOtherReceivables }}</el-col>
          <el-col :span="8">存货：{{ currentData.inventory }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">一年期非流动资产：{{ currentData.oneYearNonCurrentAssets }}</el-col>
          <el-col :span="8">其他流动资产：{{ currentData.otherCurrentAssets }}</el-col>
          <el-col :span="8">可供出售金融资产：{{ currentData.availableForSaleFinancialAssets }}</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">持有至到期投资：{{ currentData.heldToMaturityInvestment }}</el-col>
          <el-col :span="8">长期股权投资：{{ currentData.longTermEquityInvestment }}</el-col>
          <el-col :span="8">其他权益工具投资：{{ currentData.otherEquityInstrumentInvestments }}</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">其他非流动金融资产：{{ currentData.otherNonCurrentFinancialAssets }}</el-col>
          <el-col :span="8">投资性房地产：{{ currentData.investmentOrientedRealEstate }}</el-col>
          <el-col :span="8">固定资产：{{ currentData.fixedAssets }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">在建工程：{{ currentData.constructionInProgress }}</el-col>
          <el-col :span="8">无形资产：{{ currentData.intangibleAssets }}</el-col>
          <el-col :span="8">商誉：{{ currentData.goodwill }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">长期待摊费用：{{ currentData.longTermDeferredExpenses }}</el-col>
          <el-col :span="8">其他非流动资产：{{ currentData.otherNonCurrentAssets }}</el-col>
          <el-col :span="8">输出-资产调减：{{ currentData.outputAssetReduction }}</el-col>
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
 import * as echarts from 'echarts'
 import { getAssetsList } from '../api/getData';
 import { assaetX,updateEchartData,getChartOption,getUpdateOption } from '../config/echartConst';
  export default {
    components: {
    		headTop,
    	},
    mounted() {
      this.myChart = echarts.init(document.getElementById('assetChart'));
      this.initChart();
      this.queryResult();
    },
    data() {
      return {
        queryForm: {
          code: '',
          name: '',
          dateTime:''
        },
        resultList:[],
        dialogVisible: false,
        myChart:null,
        currentData:{},
      }
    },
     methods: {
      handleRowDbClick(row, column, event){
       console.log('双击行',row);
       this.currentData = row;
       this.updateEchartData(row);
      },
      updateEchartData(originList){
        if(this.myChart){
          let sdata = updateEchartData(originList);
          let option = getUpdateOption(originList,sdata,assaetX);
          this.myChart.setOption(option);
        }

      },
      //点击查询
      queryResult() {
        getAssetsList(this.queryForm).then(response => {
          if(response.data.code=="0"){
            if( response.data.data.length>0 && response.data.data[0]!=null){
              this.resultList = response.data.data;
              this.currentData = this.resultList[0];
              this.updateEchartData(this.resultList[0]);
            }
          }else{
            this.$message.error('查询资产列表失败:' + response.data.message);
          }
          
        }).catch(error => {
          this.$message.error('查询资产列表异常:', error);
        });
      },
      //点击详情
      handleClick(data){
        this.dialogVisible = true;
        this.currentData = data;
        this.updateEchartData(data);
      },
      handleClose(done) {
        done();
        this.currentData={};
        console.log('关闭对话框');
      },
      //初始化图表
      initChart(){
        let option = getChartOption('');
        this.myChart.setOption(option);
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