<script setup lang="ts">
import router from "../../router";
import axios from "axios";
import requestList from "../../requestAPI/requestList.ts";
import {ElMessage} from "element-plus";
import {useUserStore} from "../../store/userStore.ts";
import {useStyleStore} from "../../store/styleStore.ts";

const userStore = useUserStore();
const styleStore = useStyleStore();

const exit = () => {
  router.back()
}

const logout = () => {
  axios.get(`${requestList.LOGOUT}`).then((res) => {
    if (res.status === 200) {
      localStorage.removeItem("token");
      userStore.clearUserInfo()
      styleStore.clearStyle()
      router.push("/startup");
    } else {
      ElMessage.error(res.data.message);
    }
  }).catch((err) => {
    ElMessage.error(err.message);
  })
}
</script>

<template>
<div class="appSetting-wrapper">
  <div class="appSetting-wrapper-top-bar">
    <img class="appSetting-wrapper-exit-icon" src="/src/assets/icons/exit.png" alt="" @click="exit">
  </div>
  <div class="appSetting-wrapper-body">
    <el-tabs
        class="demo-tabs"
        style="height: 100%"
        tab-position="left">

      <el-tab-pane label="重置密码">
        <div class="appSetting-sub-component">
          <el-input placeholder="新密码" type="password" style="width: 200px;margin-top: 20px" maxlength="64"></el-input>
          <br>
          <el-input placeholder="验证码" type="password" style="width: 100px; margin-top: 20px" maxlength="6"></el-input>
          <button class="get-VCode-btn">发送验证码</button>
          <button class="submit-btn">提交</button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="修改手机号">
        <div class="appSetting-sub-component">
          <el-input placeholder="新手机号" type="password" style="width: 200px;margin-top: 20px" maxlength="64"></el-input>
          <br>
          <el-input placeholder="验证码" type="password" style="width: 100px; margin-top: 20px" maxlength="6"></el-input>
          <button class="get-VCode-btn">发送验证码</button>
          <button class="submit-btn">提交</button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="退出登录">
        <div class="appSetting-sub-component">
          <button class="logout-btn" @click="logout">点我退出登录</button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="反馈">
        <div class="appSetting-sub-component">
          <el-input type="textarea" style="width: 90%" resize="none" :rows="10" maxlength="500"></el-input>
          <br>
          <el-button style="margin-top: 10px; width: 100px">提交</el-button>
        </div>
      </el-tab-pane>

      <el-tab-pane label="关于">
        <div class="appSetting-sub-component">
          <span style="height: 30px; position: absolute; top: 10px; color: black">programmed by ByronGu</span>
        </div>
      </el-tab-pane>

    </el-tabs>
  </div>
</div>
</template>

<style scoped>
@import "/src/assets/css/profile/appSetting.css";
</style>