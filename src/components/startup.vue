<script setup lang="ts">
import router from "../router";

const toLogin = () => {
  router.push("/login");
}

const toRegister = () => {
  router.push("/register");
}
</script>

<template>
<div class="start-up">
  <div class="start-up-header">
    <video src="/src/assets/videos/startup.mp4" autoplay loop></video>
    <button class="start-up-btn" @click="toLogin">登陆</button>
    <button class="start-up-btn" @click="toRegister">注册</button>
  </div>
</div>
</template>

<style scoped>
@import "/src/assets/css/startup.css";
</style>