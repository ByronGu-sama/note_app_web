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
  <div class="follow-wrap">
    <div class="follow-wrap-top-bar">
      <img class="follow-wrap-exit-icon" src="/src/assets/icons/exit.png" alt="" @click="exit">
    </div>
    <el-scrollbar height="590px">
      <div class="follow-item" v-for="(i, index) in userStore.follows" :key="index">
        <el-avatar :src="i.avatarUrl" style="position: absolute; left: 10px; cursor:pointer;"/>
        <span class="follow-item-name">{{i.username}}</span>
        <img class="follow-item-chat-icon" src="/src/assets/icons/chat.png" alt="chat" @click="chat(Number(i.uid), String(i.username))">
        <button class="follow-item-btn">pending</button>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped>
@import "/src/assets/css/profile/follow.css";
</style>