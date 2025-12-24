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
						<el-menu-item index="assetManage">资产数据管理</el-menu-item>
						<el-menu-item index="liabilityManage">负债数据管理</el-menu-item>
						<el-menu-item index="profitManage">利润数据管理</el-menu-item>
					</el-submenu>
					<el-submenu iex="4">
						<template slot="title"><i class="el-icon-star-on"></i>图表</template>
						<el-menu-item index="visitor">用户分布</el-menu-item>
						<!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-edit"></i>编辑</template>
						<!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
						<el-menu-item index="vueEdit">文本编辑</el-menu-item>
					</el-submenu>
					<el-submenu index="8">
						<template slot="title"><i class="el-icon-search"></i>数据查询</template>
						<el-menu-item index="resultManage">结果表</el-menu-item>
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
