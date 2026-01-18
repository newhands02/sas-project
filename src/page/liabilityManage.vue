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
                  <el-table-column prop="shortTermBorrowing"  label="短期借款" />
                  <el-table-column prop="financialLiabilitiesIncluded"  label="计入当期损益的金融负债" />
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
       </el-row><br/>
       <div id="laoeChart" style="height:350px;"></div>
    </div>
    <el-dialog
      :title="currentData.name + '-' + currentData.reportTime"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
        <el-row>
          <el-col :span="8">短期借款：{{ currentData.shortTermBorrowing }}</el-col>
          <el-col :span="8">计入当期损益的金融负债：{{ currentData.financialLiabilitiesIncluded }}</el-col>
          <el-col :span="8">应付账款：{{ currentData.accountsPayable }}</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">预收账款：{{ currentData.advanceFromCustomers }}</el-col>
          <el-col :span="8">合同负债：{{ currentData.contractLiability }}</el-col>
          <el-col :span="8">其他应付款：{{ currentData.otherPayables }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">一年期非流动负债：{{ currentData.oneYearNonCurrentLiabilities }}</el-col>
          <el-col :span="8">其他流动负债：{{ currentData.otherCurrentLiabilities }}</el-col>
          <el-col :span="8">长期借款：{{ currentData.longTermLoans }}</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">应付债券：{{ currentData.payableBonds }}</el-col>
          <el-col :span="8">长期应付款：{{ currentData.longTermPayables }}</el-col>
          <el-col :span="8">预计负债：{{ currentData.provisions }}</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">其他非流动负债：{{ currentData.otherNonCurrentLiabilities }}</el-col>
          <el-col :span="8">负债合计：{{ currentData.totalLiabilities }}</el-col>
          <el-col :span="8">归母所有者权益：{{ currentData.equityAttributableToPowner }}</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">股本：{{ currentData.shareCapital }}</el-col>
          <el-col :span="8">现价：{{ currentData.currentPrice }}</el-col>
          <el-col :span="8">市场价值：{{ currentData.marketValue }}</el-col>
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
 import { getLaoesList } from '../api/getData';
 import * as echarts from 'echarts'
 import { laoeX,updateEchartData,getChartOption,getUpdateOption } from '../config/echartConst';
  export default {
    components: {
    		headTop,
    	},
    mounted() {
      this.laoeChart = echarts.init(document.getElementById('laoeChart'));
      this.initChart();
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
        laoeChart:null,
      }
    },
     methods: {
       handleRowDbClick(row, column, event){
       this.currentData = row;
       this.updateEchartData(row);
      },
       updateEchartData(originList){
        if(this.laoeChart){
          let sdata = updateEchartData(originList);
          let option = getUpdateOption(originList,sdata,laoeX);
          this.laoeChart.setOption(option);
        }
      },
      //点击查询
      queryResult() {
        getLaoesList(this.queryForm).then(response => {
          if(response.data.code=="0"){
             if( response.data.data.length>0 && response.data.data[0]!=null){
              this.resultList = response.data.data;
              this.currentData = this.resultList[0];
              this.updateEchartData(this.resultList[0]);
            }
          }else{
            this.$message.error('查询负债列表失败:' + response.data.message);
          }
          
        }).catch(error => {
          this.$message.error('查询负债列表异常:', error);
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
        this.laoeChart.setOption(option);
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