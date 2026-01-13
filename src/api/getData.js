import fetch from '@/config/fetch'
import http from '../config/http';
import { baseUrl } from '../config/env'
/**
 * 登陆
 */

export const login = data => fetch('/admin/login', data, 'POST');

/**
 * 退出
 */

export const signout = () => fetch('/admin/signout');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => fetch('/admin/info');

export function getAssetsList(params) {
	return http.post(baseUrl + '/query/assets', params);
}
export function getLaoesList(params) {
	return http.post(baseUrl + '/query/laoes', params);
}
export function getProfitsList(params) {
	return http.post(baseUrl + '/query/profits', params);
}

