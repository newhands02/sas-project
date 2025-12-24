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
                  <el-table-column prop="operatingRevenue"  label="营业收入" />
                  <el-table-column prop="costOfGoodsSold"  label="营业成本" />
                  <el-table-column prop="salesExpenses"  label="销售费用" />
                  <el-table-column prop="administrativeExpenses"  label="管理费用" />
                  <el-table-column prop="rdExpense"  label="研发费用" />
                  <el-table-column prop="financialExpenses"  label="财务费用" />
                  <el-table-column prop="currentNetProfit"  label="当期净利润" />
                  <el-table-column prop="netProfit"  label="净利润" />
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
          <el-col :span="8">营业收入：</el-col>
          <el-col :span="8">营业成本：</el-col>
          <el-col :span="8">销售费用：</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">管理费用：</el-col>
          <el-col :span="8">研发费用：</el-col>
          <el-col :span="8">财务费用：</el-col>
        </el-row>
        <el-row>
          <el-col :span="8">当期净利润：</el-col>
          <el-col :span="8">净利润：</el-col>
          <el-col :span="8">经营活动现金净额：</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">年资本开支：</el-col>
          <el-col :span="8">年折旧与摊销：</el-col>
          <el-col :span="8">利润调增：</el-col>
        </el-row>
         <el-row>
          <el-col :span="8">资产调增：</el-col>
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
        resultList:[{name:'潍柴动力',operatingRevenue:'2156.91',costOfGoodsSold:'1800.00',salesExpenses:'150.00',administrativeExpenses:'100.00',rdExpense:'80.00',financialExpenses:'30.00',currentNetProfit:'200.00',netProfit:'180.00'},],
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