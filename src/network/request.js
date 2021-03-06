import axios from "axios";

export function request(config) {
  // 1. 创建 axios 的实例
  const instance = axios.create({
    // baseURL: "http://123.207.32.32:8000",
    baseURL: "http://106.54.54.237:8000/api/mn",
    timeout: 5000
  })

  // 2.1 axios 请求拦截
  instance.interceptors.request.use(config => {
    return config;
  }, err => {
    return err;
  })

  // 2.2 axios 响应拦截
  instance.interceptors.response.use(response =>{
    return response.data;
  }, err => {
    return err;
  })

  // 3. 发送真正的请求
  return instance(config)
}
