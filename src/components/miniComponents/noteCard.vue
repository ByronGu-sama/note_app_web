<script setup lang="ts">
interface Props {
  title: string; // 标题
  cover: string; // 封面
  author: string; // 作者
  authorAvatar: string; // 作者头像
  likes: number; // 点赞数
}
let props = defineProps<Props>();
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
        <img :src="props.authorAvatar" alt="" v-if="props.authorAvatar" class="note-card-author-avatar"/>
        <span class="note-card-content-authorName">{{props.author}}</span>
        <img src="/src/assets/icons/like.png" class="note-card-like-icon"/>
        <span class="note-card-likes">{{props.likes}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "/src/assets/css/miniComponents/noteCard.css";
</style>