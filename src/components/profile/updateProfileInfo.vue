<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useUserStore} from "../../store/userStore.ts";
import {ElMessage} from "element-plus";
import { Plus } from '@element-plus/icons-vue'
import Cropper from "../miniComponents/cropper.vue";
import axios from "axios";
import requestList from "../../requestAPI/requestList.ts";
import router from "../../router";

const userStore = useUserStore();

let info = ref({
  username: "",
  signature: "",
  gender: "0",
  birth: "",
  avatar: "",
})
let showCropper = ref(false);
let pendingPicUrl = ref("");
let uploading = ref(false);
let avatarBlob = "";


const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

const handleUpload = (item:any) => {
  if (item.raw.type !== 'image/jpeg' && item.raw.type !== 'image/png') {
    ElMessage.error('图片格式只支持JPEG/PNG')
    return false
  }
  else if (item.size / 1024 / 1024 > 3) {
    ElMessage.error('图片最大不超过3MB')
    return false
  }

  pendingPicUrl = item.url
  showCropper.value = true
}

const getRawBlob = (blob:any) => {
  info.value.avatar = URL.createObjectURL(blob);
  avatarBlob = blob
}

const closeCropper = () => {
  showCropper.value = false
}

const getLatestUserInfo = () => {
  userStore.getUserInfo()
}

const uploadUserInfo = () => {
  if(info.value.username === "") {
    ElMessage.warning("用户不能为空");
    return;
  }
  if(info.value.avatar === "") {
    ElMessage.warning("头像不能为空");
    return;
  }

  let formData = new FormData();
  formData.append('username', info.value.username);
  formData.append('signature', info.value.signature);
  formData.append('gender', info.value.gender+'');
  formData.append('birth', info.value.birth);
  if (info.value.avatar !== userStore.userInfo.avatarUrl) {
    formData.append('avatarFile', avatarBlob);
  }

  uploading.value = true;
  axios.post(`${requestList.UPDATE_USER_INFO}`, formData).then(res => {
    if (res.data.code === 200) {
      router.push("/profile").then(() => {
        return userStore.getUserInfo()
      })
    }
  }).catch(() => {
    ElMessage.error("修改失败")
  }).finally(() => {
    uploading.value = false;
  })
}

const exit = () => {
  router.back()
}

watch(() => userStore.userInfo.uid, (n) => {
  if(n != 0) {
    info.value.username = userStore.userInfo.username!;
    info.value.signature = userStore.userInfo.signature!;
    info.value.gender = userStore.userInfo.gender!;
    info.value.birth = userStore.userInfo.birth!;
    info.value.avatar = userStore.userInfo.avatarUrl!;
  }
})

onMounted(() => {
  getLatestUserInfo()
})
</script>

<template>
<div class="update-profile-wrapper"
     v-loading="uploading"
     element-loading-text="上传中～">
  <cropper
      :img="pendingPicUrl"
      :auto-crop-height="150"
      :auto-crop-width="150"
      :showCropper="showCropper"
      @rawBlob="getRawBlob"
      @close="closeCropper"></cropper>
  <div class="update-profile-top-bar">
    <img class="update-profile-exit-icon" src="/src/assets/icons/exit.png" alt="" @click="exit">
  </div>
  <div class="update-profile-body">
    <div class="update-profile-left">
      <div class="update-profile-left-div-wrapper">
        <span>昵称：</span>
        <el-input
            style="max-width: 600px"
            maxlength="10"
            v-model="info.username"
            type="text">
        </el-input>
      </div>
      <div class="update-profile-left-div-wrapper">
        <span>签名：</span>
        <el-input
            style="max-width: 600px"
            :maxlength="150"
            v-model="info.signature"
            resize="none"
            :rows="5"
            type="textarea">
        </el-input>
      </div>
      <div class="update-profile-left-div-wrapper">
        <span>性别：</span>
        <br>
        <el-radio-group v-model="info.gender">
          <el-radio-button label="女" value="0" />
          <el-radio-button label="男" value="1" />
          <el-radio-button label="保密" value="2" />
        </el-radio-group>
      </div>
      <div class="update-profile-left-div-wrapper">
        <span>生日：</span>
        <br>
        <el-date-picker
            v-model="info.birth"
            type="date"
            :disabled-date="disabledDate"
            value-format="YYYY-MM-DD"/>
      </div>

    </div>
    <div class="update-profile-right">
      <div class="update-profile-right-div-wrapper">
        <el-upload class="avatar-uploader"
                   list-type="picture"
                   :auto-upload="false"
                   :show-file-list="false"
                   :on-change="handleUpload">
          <img v-if="info.avatar" :src="info.avatar" class="avatar"  alt=""/>
          <el-icon v-else><Plus/></el-icon>
        </el-upload>
      </div>
      <button class="update-profile-right-save-btn" @click="uploadUserInfo">保存</button>
    </div>
  </div>
</div>
</template>

<style scoped>
@import "/src/assets/css/profile/updateProfileInfo.css";
</style>