import {createApp} from 'vue'
import axios from "axios";
import {createPinia} from 'pinia'
import ElementPlus, {ElMessage} from 'element-plus'
import App from './App.vue'
import router from './router'
import './style.css'
import 'vue-cropper/next/dist/index.css'
import 'element-plus/dist/index.css'
import VueCropper from "vue-cropper/next";
import {useNoteStore} from "./store/noteStore.ts";
const pinia = createPinia()

// 默认地址
axios.defaults.baseURL = "http://localhost:8081"

// 请求拦截器
axios.interceptors.request.use( config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['token'] = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
})

// 响应拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            ElMessage({
                type: "error",
                message: "登录已失效"
            });
            router.push("/startup")
        }
        return Promise.reject(error);
    }
)

// 校验token有效性
const token = localStorage.getItem('token');
if (token) {
    axios.get("/auth/checkToken").then(() => {
        console.log("valid")
    }).catch(() => {
        router.push("/startup");
    })
} else {
    router.push("/startup");
}

router.afterEach(() => {
    const noteStore = useNoteStore();
    noteStore.closeDetailCard();
});


createApp(App)
    .use(router)
    .use(pinia)
    .use(ElementPlus)
    .use(VueCropper)
    .mount('#app')
