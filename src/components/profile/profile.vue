<script setup lang="ts">
import {ref} from "vue";
import type {ISurfaceNote} from "../../models/surfaceNoteModel.ts";
import axios from "axios";
import requestList from "../../requestAPI/requestList.ts";
import {ElMessage} from "element-plus";
import router from "../../router";
import Cropper from "../miniComponents/cropper.vue";
import {useUserStore} from "../../store/userStore.ts";
import {useStyleStore} from "../../store/styleStore.ts";
import Waterfall from "../miniComponents/waterfall.vue";

const userStore = useUserStore();
const styleStore = useStyleStore();

let showCropper = ref(false);
let uploadRef = ref<any>(null);

// 获取用户笔记
let page = 1;
let pageSize = 5;
let onLoading = ref(false);
let noMoreNotesMark = ref(false);
let result = ref<ISurfaceNote[]>([]);

const getUserNotes = () => {
  if(noMoreNotesMark.value || onLoading.value) {
    return
  }
  onLoading.value = true;
  axios.get(`${requestList.MY_NOTE_LIST}?page=${page}&limit=${pageSize}`).then((res) => {
    if (res.data.data.length < pageSize) {
      noMoreNotesMark.value = true;
    }
    result.value = res.data.data;
    page++
  }).catch(() => {
    noMoreNotesMark.value = true;
  }).finally(() => {
    onLoading.value = false;
  })
}

const toUpdateProfile = () => {
  router.push({name: "UpdateProfile"});
}

const toAppSetting = () => {
  router.push({name: "AppSetting"});
}

let pendingBanner = ref("");
const handleUpload = (item:any) => {
  if (item.raw.type !== 'image/jpeg' && item.raw.type !== 'image/png') {
    ElMessage.error('图片格式只支持JPEG/PNG')
    return
  } else if (item.size / 1024 / 1024 > 5) {
    ElMessage.error('图片最大不超过5MB')
    return
  }

  pendingBanner.value = item.url
  showCropper.value = true
}

// 获取banner blob文件并提交保存
const getRawBlob = async (blob: any) => {
  let formData = new FormData();
  formData.append("file", blob);
  axios.post(`${requestList.UPDATE_PROFILE_BANNER}`, formData).then(() => {
    styleStore.getStyle()
  }).catch(() => {
    ElMessage.error("更新失败😢")
  })
  uploadRef.value.clearFiles()
}

const toFollows = () => {
  router.push("/follows");
}

const toFollowers = () => {
  router.push("/followers");
}

// 关闭截图器
const closeCropper = () => {
  showCropper.value = false;
  uploadRef.value.clearFiles()
}
</script>

<template>
<div
    class="profile"
    v-infinite-scroll="getUserNotes"
    :infinite-scroll-disabled="noMoreNotesMark || onLoading"
    :infinite-scroll-delay="500"
    :infinite-scroll-distance="50"
    :infinite-scroll-immediate="true">
  <cropper
      :img="pendingBanner"
      :auto-crop-height="150"
      :auto-crop-width="150"
      :fixed-number="[180,37]"
      :showCropper="showCropper"
      @rawBlob="getRawBlob"
      @close="closeCropper"></cropper>
  <div class="profile-header">
    <img :src="styleStore.styleInfo.profileBanner" alt="" class="profile-banner"/>
    <div class="profile-user-info">
      <div class="profile-user-info-avatar">
        <el-avatar
            shape="circle"
            style="margin: 15px 0 0 15px"
            fit="cover"
            :size="80"
            :src="userStore.userInfo?.avatarUrl"/>
        <div class="profile-username-area">
          <span> {{userStore.userInfo?.username ? userStore.userInfo.username : ""}}</span>
          <button class="profile-edit" @click="toUpdateProfile">编辑资料</button>
          <button class="profile-edit" @click="toAppSetting">设置</button>
        </div>
        <div class="profile-user-signature-area">
          <span>{{userStore.userInfo?.signature ? userStore.userInfo.signature:""}}</span>
        </div>
        <div class="profile-user-relation">
          <div @click="toFollows">
            <span class="profile-user-relation-title">关注</span>
            <br>
            <span class="profile-user-relation-body">{{userStore.userInfo?.follows ? userStore.userInfo.follows:0}}</span>
          </div>
          <div @click="toFollowers">
            <span class="profile-user-relation-title">被关注</span>
            <br>
            <span class="profile-user-relation-body">{{userStore.userInfo?.followers ? userStore.userInfo.followers:0}}</span>
          </div>
          <div>
            <span class="profile-user-relation-title">喜欢&收藏</span>
            <br>
            <span class="profile-user-relation-body">{{userStore.userInfo?.likes ? userStore.userInfo.likes:0}}</span>
          </div>
        </div>
        <el-upload
          ref="uploadRef"
          :on-change="handleUpload"
          :show-file-list="false"
          :limit="1"
          list-type="picture"
          :auto-upload="false">
          <template #trigger>
            <img src="/src/assets/icons/setting.png" class="profile-profile-setting-icon" alt="setting"/>
          </template>
        </el-upload>
      </div>
    </div>
  </div>
  <div class="profile-body">
    <waterfall :data="result"></waterfall>
  </div>
</div>
</template>

<style scoped>
@import "/src/assets/css/profile/profile.css";
</style>