import http from '../config/http';
import { baseUrl } from '../config/env'
import { del } from 'vue';

// 获取公司列表
export function fetchCompanyList(params) {
  return http.post(baseUrl + '/company/getCompanys', params);
}
// 添加公司
export function addCompany(data) {
  return http.post(baseUrl + '/company/addCompany', data);
}
export function deleteCompany(data) {
  return http.post(baseUrl + '/company/delCompany', data);
}
