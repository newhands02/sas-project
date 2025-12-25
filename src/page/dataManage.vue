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
                  <el-table-column prop="name"  label="公司名称" />
                  <el-table-column prop="code"  label="股票代码" />
                  <el-table-column prop="place"  label="交易所" />
                  <el-table-column prop="updateTime"  label="更新时间" />
                  <el-table-column fixed="right" label="操作" width="100">
                      <template slot-scope="scope">
                         <el-dropdown @command="handleCommand">
                          <span class="el-dropdown-link">
                            添加<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="asset">资产数据</el-dropdown-item>
                            <el-dropdown-item command="liability">负债数据</el-dropdown-item>
                            <el-dropdown-item command="profit">利润数据</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </template>
                 </el-table-column>
        </el-table>
       </el-row><br/>
    </div>
    <el-dialog
      title="公司名称-股票代码"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
    <div style="overflow-y: scroll;height: 600px;">
 <el-form ref="assetform" :model="assetForm" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="货币资金">
            <el-input v-model="assetForm.monetaryFunds" placeholder="货币资金"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="交易性金融资产">
            <el-input v-model="assetForm.tradingFinancialAssets" placeholder="交易性金融资产"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="应收票据/应收账款">
            <el-input v-model="assetForm.notesReceivable" placeholder="应收票据/应收账款"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预付款项">
            <el-input v-model="assetForm.prepayments" placeholder="预付款项"></el-input>
          </el-form-item>
        </el-col>
        </el-row>
        <el-row>
        <el-col :span="12">
          <el-form-item label="其他应收款合计">
            <el-input v-model="assetForm.otherReceivables" placeholder="其他应收款合计"></el-input>
          </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="存货">
              <el-input v-model="assetForm.inventory" placeholder="存货"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="一年期非流动资产">
              <el-input v-model="assetForm.oneYearNonCurrentAssets" placeholder="一年期非流动资产"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他流动资产">
                <el-input v-model="assetForm.otherCurrentAssets" placeholder="其他流动资产"></el-input>
              </el-form-item>
              </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="可供出售金融资产">
            <el-input v-model="assetForm.availableForSaleFinancialAssets" placeholder="可供出售金融资产"></el-input>
          </el-form-item>
          </el-col>
           <el-col :span="12">
              <el-form-item label="输出-资产调减">
                <el-input v-model="assetForm.outputAssetReduction" placeholder="产成资产减值准备"></el-input>
              </el-form-item>
              </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="持有至到期投资">
              <el-input v-model="assetForm.heldToMaturityInvestments" placeholder="持有至到期投资"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="长期股权投资">
              <el-input v-model="assetForm.longTermEquityInvestments" placeholder="长期股权投资"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="其他权益工具投资">
              <el-input v-model="assetForm.otherEquityInstrumentsInvestments" placeholder="其他权益工具投资"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="其他非流动金融资产">
              <el-input v-model="assetForm.otherNonCurrentFinancialAssets" placeholder="其他非流动金融资产"></el-input>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row>
          <el-col :span="12">
            <el-form-item label="投资性房地产">
              <el-input v-model="assetForm.investmentRealEstate" placeholder="投资性房地产"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="固定资产">
              <el-input v-model="assetForm.fixedAssets" placeholder="固定资产"></el-input>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
          <el-col :span="12">
            <el-form-item label="在建工程">
              <el-input v-model="assetForm.constructionInProgress" placeholder="在建工程"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="无形资产">
                <el-input v-model="assetForm.intangibleAssets" placeholder="无形资产"></el-input>
              </el-form-item>
              </el-col>
          </el-row>
          <el-row>
          <el-col :span="12">
            <el-form-item label="商誉">
              <el-input v-model="assetForm.goodwill" placeholder="商誉"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="长期待摊费用">
                <el-input v-model="assetForm.longTermDeferredExpenses" placeholder="长期待摊费用"></el-input>
              </el-form-item>
              </el-col>
          </el-row>
          <el-row>
          <el-col :span="12">
            <el-form-item label="其他非流动资产">
              <el-input v-model="assetForm.otherNonCurrentAssets" placeholder="其他非流动资产"></el-input>
            </el-form-item>
            </el-col>
           
          </el-row>
     </el-form>
    </div>
    



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
        resultList:[{name:'潍柴动力',code:'000338',place:'深交所',updateTime:'2024-06-01'},
        {name:'中国平安',code:'601318',place:'上交所',updateTime:'2024-06-01'}],
        dialogVisible: false,
        myChart:null,
        assetForm:{
          monetaryFunds:'',
          tradingFinancialAssets:'',
          notesReceivable:'',
          accountsReceivable:'',
          prepayments:'',
          otherReceivables:'',
          inventory:'',
          oneYearNonCurrentAssets:'',
          otherCurrentAssets:'',
          availableForSaleFinancialAssets:'',
          heldToMaturityInvestments:'',
          longTermEquityInvestments:'',
          otherEquityInstrumentsInvestments:'',
          otherNonCurrentFinancialAssets:'',
          investmentRealEstate:'',
          fixedAssets:'',
          constructionInProgress:'',
          intangibleAssets:'',
          goodwill:'',
          longTermDeferredExpenses:'',
          otherNonCurrentAssets:'',
          outputAssetReduction:''
        }
      }
    },
     methods: {
      //点击查询
      queryResult() {
        console.log('submit!');
      },
      handleClose(done) {
        done();
        console.log('关闭对话框');
      },
      handleCommand(command) {
        if (command === 'asset') {
          console.log('添加资产数据');
        } else if (command === 'liability') {
          console.log('添加负债数据');
        } else if (command === 'profit') {
          console.log('添加利润数据');
        }
        this.dialogVisible = true;
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