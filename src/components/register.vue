<script setup lang="ts">
import {ref} from "vue";
import {ElMessage} from "element-plus";
import axios from "axios";
import router from "../router";
import loginAndRegister from "../requestAPI/userInfoRequest.ts";

const phoneReg:RegExp = /(^1\d{10}$)|(^[0-9]\d{7}$)/;
const pwdReg:RegExp = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+~`\-={}|[\]\\:";'<>?,./]{8,}$/

let registerInfo = ref({
  phone: '',
  password: ''
})

// 登陆
const register = () => {
  if (!phoneReg.test(registerInfo.value.phone)) {
    ElMessage({
      type: 'error',
      message: '手机号格式错误'
    })
    return;
  }
  if (!pwdReg.test(registerInfo.value.password)) {
    ElMessage({
      type: 'error',
      message: '密码格式错误'
    })
    return;
  }

  axios.post(loginAndRegister.REGISTER, registerInfo.value).then( res => {
    if (res.data.code == 200) {
      ElMessage({
        type: 'success',
        message: res.data.message,
      })
      setTimeout(() => {
        router.push('/login')
      },2000)
    } else {
      ElMessage({
        type: 'error',
        message: res.data.message,
      })
      registerInfo.value.phone = ''
      registerInfo.value.password = ''
    }
  }).catch( err => {
    ElMessage({
      type: 'error',
      message: err.message
    })
  })
}
</script>

<template>
  <div class="register">
    <div class="register-container">
      <p>SIGN UP</p>
      <el-input
          v-model="registerInfo.phone"
          style="width: 240px"
          placeholder="手机号"
          max="254"
      />
      <p></p>
      <el-input
          v-model="registerInfo.password"
          style="width: 240px"
          placeholder="密码（包含数字、字母）"
          :show-password="true"
          max="256"
      />
      <br>
      <button @click="register" class="registerBtn">注册</button>
    </div>
  </div>
</template>

<style scoped>
@import "/src/assets/css/register.css";
</style>