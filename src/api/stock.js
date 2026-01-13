import http from '../config/http';
import { baseUrl } from '../config/env'

export function fetchResultList(params) {
  return http.get(baseUrl + '/stock/getResultList', { params: params });
}
//更新全部报表
export function updateAllReports() {
  return http.get(baseUrl + '/stock/updateAll');
}