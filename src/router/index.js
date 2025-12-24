import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const result = r => require.ensure([], () => r(require('@/page/result')), 'result');
const assetManage = r => require.ensure([], () => r(require('@/page/assetManage')), 'assetManage');
const liabilityManage = r => require.ensure([], () => r(require('@/page/liabilityManage')), 'liabilityManage');
const profitManage = r => require.ensure([], () => r(require('@/page/profitManage')), 'profitManage	');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		}, {
			path: '/resultManage',
			component: result,
			meta: ['数据查询', '结果表'],
		}, {
			path: '/assetManage',
			component: assetManage,
			meta: ['数据管理', '资产数据管理'],
		}, {
			path: '/liabilityManage',
			component: liabilityManage,
			meta: ['数据管理', '负债数据管理'],
		},  {
			path: '/profitManage',
			component: profitManage,
			meta: ['数据管理', '利润数据管理'],
		},  {
			path: '/visitor',
			component: visitor,
			meta: ['图表', '用户分布'],
		}, {
			path: '/newMember',
			component: newMember,
			meta: ['图表', '用户数据'],
		}]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
