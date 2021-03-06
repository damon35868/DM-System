import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from '../router'

//注意一点，它只有发起请求的时候才会有拦截，刷新是不会被拦截的

let loading
function startLoading (){
    loading = Loading.service({
        lock: true,
		fullscreen: true,
		spinner: 'el-icon-loading',
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading (){
    loading.close()
}


//请求拦截
axios.interceptors.request.use(config => {
    //加载动画
    startLoading()
    if(localStorage.token){
        //设置统一请求头
        config.headers.Authorization = localStorage.token
    }
    return config
}, error => {
    return Promise.reject(error)
})


//响应拦截
axios.interceptors.response.use(response => {
    //结束加载动画
    endLoading()
    return response
}, error => {
    endLoading()
	// if (Message.error(error.response.data.msg)) Message.error(error.response.data.msg);
	// else Message.error(error.message);
	
    //获取状态码
    const {status} = error.response;
    if(status === 401){
        Message.error('token失效，请重新登录')
        localStorage.removeItem('eleToken')
        //跳转到登录页需要router路由
        router.push('/login')
    }
    return Promise.reject(error)
})

export default axios