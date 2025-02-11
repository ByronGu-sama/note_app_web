<script setup lang="ts">
import type {ISurfaceNote} from "../../models/surfaceNoteModel.ts";
import {convertToShortNumber} from "../../tools/numberTools.ts";
import {useNoteStore} from "../../store/noteStore.ts";
import {ElMessage} from "element-plus";

const noteStore = useNoteStore();

let props = defineProps<ISurfaceNote>();

const openNoteCard = () => {
  if (props.nid) {
    noteStore.closeDetailCard()
    let nid = props.nid
    noteStore.getNoteDetail(nid)
    noteStore.getNoteComment(nid)
  } else {
    ElMessage({
      type: "warning",
      message: "出错啦～"
    })
  }
}
</script>

<template>
  <div class="note-card-area"
       @click="openNoteCard()"
       v-if="props.avatarUrl !== undefined && props.cover !== undefined && props.title !== undefined && props.username !== undefined && props.likesCount !== undefined">
    <div class="note-card-header">
      <img :src="props.cover" alt="" class="note-card-cover"/>
    </div>
    <div class="note-card-content">
      <div class="note-card-content-title">
        <span>{{props.title}}</span>
      </div>
      <div class="note-card-content-author">
        <img :src="props.avatarUrl" alt="" class="note-card-author-avatar"/>
        <span class="note-card-content-authorName">{{props.username}}</span>
        <img src="/src/assets/icons/like.png" class="note-card-like-icon" alt=""/>
        <span class="note-card-likes">{{convertToShortNumber(props.likesCount)}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "/src/assets/css/miniComponents/noteCard.css";
</style>