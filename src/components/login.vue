<script setup lang="ts">
import {ref} from "vue";
import {ElMessage} from "element-plus";
import axios from "axios";
import router from "../router";
import loginAndRegister from "../requestAPI/userInfoRequest.ts";
import {useUserStore} from "../store/userStore.ts";

const phoneReg:RegExp = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
const pwdReg:RegExp = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+~`\-={}|[\]\\:";'<>?,./]{8,}$/;
const userStore = useUserStore();

let loginInfoByPhone = ref({
  phone: '',
  password: ''
});
let loading = ref(false);
// 登陆
const login = () => {
  if (!phoneReg.test(loginInfoByPhone.value.phone)) {
    ElMessage({
      type: 'error',
      message: '手机号格式错误'
    });
    return;
  }
  // if (!pwdReg.test(loginInfoByPhone.value.password)) {
  //   ElMessage({
  //     type: 'error',
  //     message: '密码格式错误'
  //   });
  //   return;
  // }
  loading.value = true;
  axios.post(loginAndRegister.LOGIN, loginInfoByPhone.value).then( res => {
    if (res.data.code == 200) {
      const token = res.data.token;
      localStorage.setItem('token', token);
      router.push('/home');
    }
  }).catch( res => {
    ElMessage({
      type: 'error',
      message: res.data.message
    });
  }).finally(() => {
    loading.value = false;
  })
}

</script>

<template>
<div class="login"
     v-loading="loading"
     element-loading-text="登陆中..."
>
  <div class="login-container">
    <p>SIGN IN</p>
    <el-input
        v-model="loginInfoByPhone.phone"
        style="width: 240px"
        placeholder="手机号"
        max="254"
    />
    <p></p>
    <el-input
        v-model="loginInfoByPhone.password"
        style="width: 240px"
        placeholder="密码"
        :show-password="true"
        max="256"
    />
    <br>
    <button @click="login" class="loginBtn">登陆</button>
  </div>
</div>
</template>

<style scoped>
@import "/src/assets/css/login.css";
</style>