<script setup lang="ts">
import router from "../router";
import {useUserStore} from "../store/userStore.ts";
import {useStyleStore} from "../store/styleStore.ts";

const userStore = useUserStore();
const styleStore = useStyleStore();

const token = localStorage.getItem('token');
if (token == null || token == "") {
  router.push("/startup")
} else {
  userStore.getUserInfo()
  userStore.getUserFollows()
  userStore.getUserFollowers()
  styleStore.getStyle()
}
</script>

<template>
<div class="main">
  <div class="header">
    <router-view v-slot="{Component}">
      <keep-alive>
        <component :is="Component" :key="$route.fullPath" v-if="$route.meta.keepAlive" ></component>
      </keep-alive>
      <component :is="Component" :key="$route.fullPath" v-if="!$route.meta.keepAlive" ></component>
    </router-view>
  </div>
  <div class="nav">
    <router-link to="/home" class="router-link-active">
      <div class="nav-btn">
        <img src="/src/assets/icons/home1.png" alt="home"/>
        <br>
        <span>首页</span>
      </div>
    </router-link>
    <router-link to="/topic" class="router-link-active">
      <div class="nav-btn">
        <img src="/src/assets/icons/video1.png" alt="topic"/>
        <br>
        <span>热点</span>
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