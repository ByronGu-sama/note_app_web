<script setup lang="ts">
import type {ISurfaceNote} from "../../models/surfaceNoteModel.ts";
let props = defineProps<ISurfaceNote>();
</script>

<template>
  <div class="note-card-area">
    <div class="note-card-header">
      <img :src="props.cover" alt="" v-if="props.cover" class="note-card-cover"/>
    </div>
    <div class="note-card-content">
      <div class="note-card-content-title">
        <span>{{props.title}}</span>
      </div>
      <div class="note-card-content-author">
        <img :src="props.avatarUrl" alt="" v-if="props.avatarUrl" class="note-card-author-avatar"/>
        <span class="note-card-content-authorName">{{props.username}}</span>
        <img src="/src/assets/icons/like.png" class="note-card-like-icon" alt=""/>
        <span class="note-card-likes">{{props.likesCount}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "/src/assets/css/miniComponents/noteCard.css";
</style>