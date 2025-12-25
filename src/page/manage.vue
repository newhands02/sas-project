<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" 
				background-color="#324057" 
				text-color="#fff"
				active-text-color="#ffd04b" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>数据管理</template>
						<el-menu-item index="dataManage">添加数据</el-menu-item>
					</el-submenu>
					<el-submenu index="8">
						<template slot="title"><i class="el-icon-search"></i>数据查询</template>
						<el-menu-item index="resultManage">结果表</el-menu-item>
						<el-menu-item index="assetManage">资产数据查询</el-menu-item>
						<el-menu-item index="liabilityManage">负债数据查询</el-menu-item>
						<el-menu-item index="profitManage">利润数据查询</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{
		
	}
</style>
