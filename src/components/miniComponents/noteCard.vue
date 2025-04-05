<script setup lang="ts">
import type {ISurfaceNote} from "../../models/surfaceNoteModel.ts";
import {convertToShortNumber} from "../../tools/numberTools.ts";
import router from "../../router";
import {ref} from "vue";

let props = defineProps<ISurfaceNote>();
let loadedImg = ref<boolean>(false);

const showImg = () => {
  loadedImg.value = true;
}

const openNoteCard = () => {
  router.push(`/noteDetail/:${props.nid}`)
}
</script>

<template>
  <div class="note-card-area"
       @click="openNoteCard()"
       v-if="props.avatarUrl !== undefined && props.cover !== undefined && props.title !== undefined && props.username !== undefined && props.likes_count !== undefined">
    <el-skeleton :loading="!loadedImg" animated>
      <template #template>
        <el-skeleton-item variant="image" style="width: 100%;height: 200px"></el-skeleton-item>
      </template>
    </el-skeleton>
    <div class="note-card-header">
      <img :src="props.cover" alt="" v-show="loadedImg" @load="showImg" class="note-card-cover"/>
    </div>
    <div class="note-card-content">
      <div class="note-card-content-title">
        <span>{{props.title}}</span>
      </div>
      <div class="note-card-content-author">
        <img :src="props.avatarUrl" alt="" class="note-card-author-avatar"/>
        <span class="note-card-content-authorName">{{props.username}}</span>
        <img src="/src/assets/icons/like1.png" class="note-card-like-icon" alt=""/>
        <span class="note-card-likes">{{convertToShortNumber(props.likes_count)}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.note-card-area {
  width: 200px;
  height: auto;
  background-color: #f8f8f8;
  margin-top: 20px;
  border-radius: 20px;
  cursor: pointer;
  position: relative;
}
.note-card-header {
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
}
.note-card-cover {
  width: 100%;
  display: block;
}
.note-card-content {
  width: 100%;
  height: 80px;
}
.note-card-content-title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
  color: #242424;
  font-size: 15px;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-indent: 8px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.note-card-content-author {
  width: 100%;
  height: 50px;
  position: relative;
}
.note-card-author-avatar {
  width: 30px;
  height: 30px;
  border-radius: 20px;
  position: absolute;
  bottom: 7px;
  left: 7px;
}
.note-card-content-authorName {
  position: absolute;
  left: 42px;
  bottom: 13px;
  font-size: 13px;
  color: #242424;
}
.note-card-like-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 30px;
  bottom: 13px;
}
.note-card-likes {
  color: #242424;
  font-size: 12px;
  position: absolute;
  right: 20px;
  bottom: 14px;
}
</style>