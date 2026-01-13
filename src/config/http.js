import axios from 'axios';

// 创建Axios实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么，例如添加token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 处理错误响应
    if (error.response && error.response.status === 401) {
      // 处理未授权错误
      console.log('未授权，跳转到登录页');
    }
    return Promise.reject(error);
  }
);

export default instance;