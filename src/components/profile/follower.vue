<script setup lang="ts">
import {useUserStore} from "../../store/userStore.ts";
import {useMessageStore} from "../../store/messageStore.ts"
import router from "../../router";

const userStore = useUserStore();
const messageStore = useMessageStore();

const chat = (uid:number, username:string) => {
  messageStore.updateMsgTarget(uid, username);
  router.push(`/message`);
}

const exit = () => {
  router.back()
}
</script>

<template>
  <div class="follower-wrap">
    <div class="follower-wrap-top-bar">
      <img class="follower-wrap-exit-icon" src="/src/assets/icons/exit.png" alt="" @click="exit">
    </div>
    <el-scrollbar height="590px">
      <div class="follower-item" v-for="(i, index) in userStore.follows" :key="index">
        <el-avatar :src="i.avatarUrl" style="position: absolute; left: 10px; cursor:pointer;"/>
        <span class="follower-item-name">{{i.username}}</span>
        <img class="follower-item-chat-icon" src="/src/assets/icons/chat.png" @click="chat(Number(i.uid), String(i.username))" alt="chat">
        <button class="follower-item-btn">pending</button>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped>
@import "/src/assets/css/profile/follower.css";
</style>