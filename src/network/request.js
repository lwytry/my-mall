import axios from 'axios'

export function request(config) {
    const instence = axios.create({
        // baseURL: 'http://www.baidu.com',
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000,
    })
    // 拦截器
    instence.interceptors.request.use(config => {
        // 一定要return
        return config
    }, fail =>{

    })
    instence.interceptors.response.use(res => {
        return res.data
    }, fail =>{

    })
    return instence(config)
}
