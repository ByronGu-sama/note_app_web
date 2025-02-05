<script setup lang="ts">
import {useUserStore} from "../store/userStore.ts";
import router from "../router";
const userStore = useUserStore();

const token = localStorage.getItem('token');
if (token == null || token == "") {
  router.push("/startup")
} else {
  userStore.getUserInfo()
}
</script>

<template>
<div class="main">
  <div class="header">
    <router-view/>
  </div>
  <div class="nav">
    <router-link to="/home" class="router-link-active">
      <div class="nav-btn">
        <img src="/src/assets/icons/home1.png" alt="home"/>
        <br>
        <span>首页</span>
      </div>
    </router-link>
    <router-link to="/video" class="router-link-active">
      <div class="nav-btn">
        <img src="/src/assets/icons/video1.png" alt="video"/>
        <br>
        <span>视频</span>
      </div>
    </router-link>
    <router-link to="/newNote" class="router-link-active">
      <div class="add">
        <img src="/src/assets/icons/add.png" alt="add"/>
      </div>
    </router-link>
    <router-link to="/message" class="router-link-active">
      <div class="nav-btn">
        <img src="/src/assets/icons/msg1.png" alt="msg"/>
        <br>
        <span>消息</span>
      </div>
    </router-link>
    <router-link to="/profile" class="router-link-active">
      <div class="nav-btn">
        <img src="/src/assets/icons/user1.png" alt="user"/>
        <br>
        <span>我的</span>
      </div>
    </router-link>
  </div>
</div>
</template>

<style scoped>
@import "/src/assets/css/main.css";
</style>