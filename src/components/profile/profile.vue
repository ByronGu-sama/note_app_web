<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import notes from "../../simulation/notes.ts"
import noteCard from "../miniComponents/noteCard.vue";
import type {ISurfaceNote} from "../../models/surfaceNoteModel.ts";

let user = ref({
  avatar: "/src/assets/pics/avatar.jpeg",
  nickname: "hachiware",
  signature: "这是一条签名",
  follows: 11,
  followers: 20,
  likes: 10,
  banner: "src/assets/pics/banner.jpeg",
});

interface gridArrItem {
  id: number;
  height: number;
  data: ISurfaceNote[];
}
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

const pushToArrByImgHeight = (notesArr:any) => {
  if (notesArr.length == 0) {
    return
  }
  for (let i of notesArr) {
    let minHeightIndex = 0;
    for (let j = 1; j < gridArr.length; j++) {
      if (gridArr[minHeightIndex].height > gridArr[j].height) {
        minHeightIndex = j;
      }
    }
    gridArr[minHeightIndex].data.push(i)
    gridArr[minHeightIndex].height += i.coverHeight;
  }
}

onMounted(() => {
  pushToArrByImgHeight(notes);
})
</script>

<template>
<div class="profile">
  <div class="profile-header">
    <img src="/src/assets/pics/banner.jpeg" alt="" class="profile-banner"/>
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
        <img src="/src/assets/icons/setting.png" class="profile-profile-setting-icon" alt="setting"/>
      </div>
    </div>
  </div>
  <div class="profile-body">
    <div class="note-body">
      <noteCard
          v-for="i in  gridArr[0].data" key="i"
          :authorAvatar="i.authorAvatar"
          :author="i.author"
          :cover="i.cover"
          :likes="i.likes"
          :title="i.title"
      ></noteCard>
    </div>
    <div class="note-body">
      <noteCard
          v-for="i in gridArr[1].data" key="i"
          :authorAvatar="i.authorAvatar"
          :author="i.author"
          :cover="i.cover"
          :likes="i.likes"
          :title="i.title"
          :cover-height="i.coverHeight"
          :nid="i.nid"
      ></noteCard>
    </div>
    <div class="note-body">
      <noteCard
          v-for="i in gridArr[2].data" key="i"
          :authorAvatar="i.authorAvatar"
          :author="i.author"
          :cover="i.cover"
          :likes="i.likes"
          :title="i.title"
          :cover-height="i.coverHeight"
          :nid="i.nid"
      ></noteCard>
    </div>
    <div class="note-body">
      <noteCard
          v-for="i in gridArr[3].data" key="i"
          :authorAvatar="i.authorAvatar"
          :author="i.author"
          :cover="i.cover"
          :likes="i.likes"
          :title="i.title"
          :cover-height="i.coverHeight"
          :nid="i.nid"
      ></noteCard>
    </div>
  </div>
</div>
</template>

<style scoped>
@import "/src/assets/css/profile/profile.css";
</style>