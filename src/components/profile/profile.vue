<script setup lang="ts">
import {ref} from "vue";

let user = ref({
  avatar: "/src/assets/pics/avatar.jpeg",
  nickname: "hachiware",
  signature: "这是一条签名",
  follows: 11,
  followers: 20,
  likes: 10,
  banner: "src/assets/pics/banner.jpeg",
});
</script>

<template>
<div class="profile">
  <div class="profile-header">
    <div class="profile-user-info">
      <div class="profile-user-info-avatar">
        <el-avatar
            shape="circle"
            style="margin: 15px 0 0 15px"
            fit="cover"
            :size="80"
            :src="user.avatar"/>
        <div class="profile-username-area">
          <span>{{user.nickname}}</span>
        </div>
        <div class="profile-user-signature-area">
          <span>{{user.signature}}</span>
        </div>
        <div class="profile-edit">
          编辑资料
        </div>
        <div class="profile-user-relation">
          <div>
            <span class="profile-user-relation-title">关注</span>
            <br>
            <span class="profile-user-relation-body">{{user.follows}}</span>
          </div>
          <div>
            <span class="profile-user-relation-title">被关注</span>
            <br>
            <span class="profile-user-relation-body">{{user.followers}}</span>
          </div>
          <div>
            <span class="profile-user-relation-title">喜欢&收藏</span>
            <br>
            <span class="profile-user-relation-body">{{user.likes}}</span>
          </div>
        </div>
      </div>

      <div class="profile-profile-setting">
        <img src="/src/assets/icons/setting.png" class="profile-profile-setting-icon" alt="setting"/>
      </div>
    </div>
  </div>
  <div class="profile-body">
    <div style="width: 100%;height: 500px; background-color: #303133"></div>
  </div>
</div>
</template>

<style scoped>
@import "/src/assets/css/profile/profile.css";
</style>