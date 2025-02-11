<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useUserStore} from "../../store/userStore.ts";
import {ElMessage} from "element-plus";
import { Plus } from '@element-plus/icons-vue'
import Cropper from "../miniComponents/cropper.vue";

const userStore = useUserStore();

let info = ref({
  username: "",
  signature: "",
  gender: 0,
  birth: "",
  avatar: "",
})
let showCropper = ref(false);
let pendingPicUrl = ref("");


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

const getRawBlobUrl = (url:string) => {
  info.value.avatar = url;
}

onMounted(() => {
  userStore.getUserInfo()
  info.value.username = userStore.userInfo.username!;
  info.value.signature = userStore.userInfo.signature!;
  info.value.gender = userStore.userInfo.gender!;
  info.value.birth = userStore.userInfo.birth!;
  info.value.avatar = userStore.userInfo.avatarUrl!;
})
</script>

<template>
<div class="update-profile-wrapper">
  <cropper :img="pendingPicUrl" :auto-crop-height="150" :auto-crop-width="150" :show-cropper="showCropper" @rawBlobUrl="getRawBlobUrl"></cropper>
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
        <el-radio-button label="女" :value="0" />
        <el-radio-button label="男" :value="1" />
        <el-radio-button label="保密" :value="2" />
      </el-radio-group>
    </div>
    <div class="update-profile-left-div-wrapper">
      <span>生日：</span>
      <br>
      <el-date-picker
          v-model="info.birth"
          type="date"
          :disabled-date="disabledDate"
      />
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
    <button class="update-profile-right-save-btn">保存</button>
  </div>
</div>
</template>

<style scoped>
@import "/src/assets/css/profile/updateProfileInfo.css";
</style>