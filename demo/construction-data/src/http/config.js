// api.js
import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://localhost:8010', // 设置默认的 API 地址
  timeout: 5000 // 设置请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么，比如设置 Token
    // config.headers.Authorization = 'Your Token';
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response.data
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 封装 GET 请求
export function get (url, params = {}) {
  console.log('GET', url, params)
  return service.get(url, { params })
}

// 封装 POST 请求
export function post (url, data = {}) {
  return service.post(url, data)
}
