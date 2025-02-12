<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import noteCard from "../miniComponents/noteCard.vue";
import type {ISurfaceNote} from "../../models/surfaceNoteModel.ts";
import axios from "axios";
import requestList from "../../requestAPI/requestList.ts";
import {ElMessage} from "element-plus";
import router from "../../router";
import Cropper from "../miniComponents/cropper.vue";
import {useUserStore} from "../../store/userStore.ts";
import {useStyleStore} from "../../store/styleStore.ts";

interface gridArrItem {
  id: number;
  height: number;
  data: ISurfaceNote[];
}

const userStore = useUserStore();
const styleStore = useStyleStore();

let gridArr = reactive<gridArrItem[]>([
    {
      id: 1,
      height: 0,
      data: []
    },
    {
      id: 2,
      height: 0,
      data: []
    },
    {
      id: 3,
      height: 0,
      data: []
    },
    {
      id: 4,
      height: 0,
      data: []
    }
]);
let pendingBanner = ref("");
let showCropper = ref(false);
let uploadRef = ref<any>(null);

// 将笔记推送至瀑布流队列
const pushToArrByImgHeight = (notesArr:ISurfaceNote[]) => {
  if (notesArr.length == 0) {
    return;
  }
  for (let i of notesArr) {
    let minHeightIndex = 0;
    for (let j = 1; j < gridArr.length; j++) {
      if (gridArr[minHeightIndex].height > gridArr[j].height) {
        minHeightIndex = j;
      }
    }
    gridArr[minHeightIndex].data.push(i);
    gridArr[minHeightIndex].height += i.cover_height!;
  }
}

// 获取用户笔记
const getUserNotes = () => {
  axios.get(requestList.MY_NOTE_LIST + "?page=1&limit=1").then((res) => {
    if(res.data.code === 200) {
      pushToArrByImgHeight(res.data.data);
    } else {
      ElMessage({
        type: "error",
        message: res.data.message,
      });
    }
  }).catch(() => {
    ElMessage({
      type: "error",
      message: "获取笔记失败",
    });
  });
}

const toUpdateProfile = () => {
  router.push({name: "UpdateProfile"});
}

const handleUpload = (item:any) => {
  if (item.raw.type !== 'image/jpeg' && item.raw.type !== 'image/png') {
    ElMessage.error('图片格式只支持JPEG/PNG')
    return
  }
  else if (item.size / 1024 / 1024 > 5) {
    ElMessage.error('图片最大不超过5MB')
    return
  }

  pendingBanner.value = item.url
  showCropper.value = true
}

// 获取banner blob文件并提交保存
const getRawBlob = async (blob: any) => {
  let formData = new FormData();
  formData.append("banner", blob);
  const result1 = await axios.post(`${requestList.UPDATE_PROFILE_BANNER}`, formData)
  if(result1.status == 200) {
    styleStore.getStyle()
  } else {
    ElMessage.error("更新失败😢")
  }
  uploadRef.value.clearFiles()
}

// 关闭截图器
const closeCropper = () => {
  showCropper.value = false;
  uploadRef.value.clearFiles()
}

onMounted(() => {
  getUserNotes();
})
</script>

<template>
<div class="profile">
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
          <span>{{userStore.userInfo?.username ? userStore.userInfo.username : ""}}</span>
        </div>
        <div class="profile-user-signature-area">
          <span>{{userStore.userInfo?.signature ? userStore.userInfo.signature:""}}</span>
        </div>
        <div class="profile-edit" @click="toUpdateProfile">
          编辑资料
        </div>
        <div class="profile-user-relation">
          <div>
            <span class="profile-user-relation-title">关注</span>
            <br>
            <span class="profile-user-relation-body">{{userStore.userInfo?.follows ? userStore.userInfo.follows:0}}</span>
          </div>
          <div>
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
<!--    1-->
    <div class="note-body">
      <noteCard
          v-for="i in gridArr[0].data" key="i"
          :avatarUrl="i.avatarUrl"
          :username="i.username"
          :cover="i.cover"
          :likesCount="i.likesCount"
          :title="i.title"
          :cover_height="i.cover_height"
          :nid="i.nid"
      ></noteCard>
    </div>
<!--    2-->
    <div class="note-body">
      <noteCard
          v-for="i in gridArr[1].data" key="i"
          :avatarUrl="i.avatarUrl"
          :username="i.username"
          :cover="i.cover"
          :likesCount="i.likesCount"
          :title="i.title"
          :cover_height="i.cover_height"
          :nid="i.nid"
      ></noteCard>
    </div>
<!--    3-->
    <div class="note-body">
      <noteCard
          v-for="i in gridArr[2].data" key="i"
          :avatarUrl="i.avatarUrl"
          :username="i.username"
          :cover="i.cover"
          :likesCount="i.likesCount"
          :title="i.title"
          :cover_height="i.cover_height"
          :nid="i.nid"
      ></noteCard>
    </div>
<!--    4-->
    <div class="note-body">
      <noteCard
          v-for="i in gridArr[3].data" key="i"
          :avatarUrl="i.avatarUrl"
          :username="i.username"
          :cover="i.cover"
          :likesCount="i.likesCount"
          :title="i.title"
          :cover_height="i.cover_height"
          :nid="i.nid"
      ></noteCard>
    </div>

  </div>
</div>
</template>

<style scoped>
@import "/src/assets/css/profile/profile.css";
</style>