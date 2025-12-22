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
          <el-form-item>
            <el-button >添加</el-button>
          </el-form-item>
        </el-form>
        <el-table
                :data="resultList" 
                border
                style="width: 100%">
                  <el-table-column prop="name"  label="名称" />
                  <el-table-column prop="monetaryFunds"  label="货币资金" />
                  <el-table-column prop="tradingFinancialAssets"  label="交易性金融资产" />
                  <el-table-column prop="notesReceivable"  label="应收票据/应收账款" />
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
       </el-row>
    </div>
    <el-dialog
      title="公司名称-股票代码"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
     <!-- 走马灯显示4张表 -->
        <el-row>
          <el-col :span="8">货币资金：</el-col>
          <el-col :span="8">交易性金融资产：</el-col>
          <el-col :span="8">应收票据/应收账款：</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">预付款项：</el-col>
          <el-col :span="8">其他应收款合计：</el-col>
          <el-col :span="8">存货：</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">一年期非流动资产：</el-col>
          <el-col :span="8">其他流动资产：</el-col>
          <el-col :span="8">可供出售金融资产：</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">持有至到期投资：</el-col>
          <el-col :span="8">长期股权投资：</el-col>
          <el-col :span="8">其他权益工具投资：</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">其他非流动金融资产：</el-col>
          <el-col :span="8">投资性房地产：</el-col>
          <el-col :span="8">固定资产：</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">在建工程：</el-col>
          <el-col :span="8">无形资产：</el-col>
          <el-col :span="8">商誉：</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">长期待摊费用：</el-col>
          <el-col :span="8">其他非流动资产：</el-col>
          <el-col :span="8">输出-资产调减：</el-col>
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
        resultList:[{name:'潍柴动力',monetaryFunds:'627.21'}],
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