<script setup lang="ts">
import timeTools from "../../tools/timeTools.ts";

const props = defineProps(["avatarUrl", "username", "content", "likes_count", "publishedAt", "children"]);
</script>

<template>
<div class="comment-card">
  <div class="comment-card-mainContent">
    <div class="comment-card-userInfo">
      <div class="comment-card-userInfo-left">
        <el-avatar :src="props.avatarUrl" style="position: absolute;left: 5px;top: 5px;cursor: pointer"/>
        <span class="comment-card-username">{{ props.username }}</span>
      </div>
      <div class="comment-card-userInfo-right">
        <img src="../../assets/icons/thumbsUp.png" alt="点赞">
        <span>{{props.likes_count}}</span>
      </div>
    </div>
    <div class="comment-card-comment">
      <span>{{props.content}}</span>
    </div>
    <div class="comment-card-bottom">
      <span>{{timeTools.formatTime(props.publishedAt)}}</span>
    </div>
  </div>
 <div class="comment-card-subContent">
   <div v-for="(item, index) in props.children" :key="index" class="comment-card-subContent-body">
     <div class="comment-card-subContent-userInfo">
       <div class="comment-card-subContent-userInfo-left">
         <el-avatar size="small" :src="item.avatarUrl" style="position: absolute;left: 5px;top: 5px;cursor: pointer"/>
         <span class="comment-card-subContent-username">{{ item.username }}</span>
       </div>
       <div class="comment-card-subContent-userInfo-right">
         <img src="../../assets/icons/thumbsUp.png" alt="点赞">
         <span>{{item.likes_count}}</span>
       </div>
     </div>
     <div class="comment-card-subContent-comment">
       <span>回复</span>
       <span style="color: #ca5800">{{item.parent_name}}</span>
       <span>：{{item.content}}</span>
     </div>
     <div class="comment-card-subContent-bottom">
       <span>{{timeTools.formatTime(item.created_at)}}</span>
     </div>
   </div>
 </div>
</div>
</template>

<style scoped>
@import "../../assets/css/miniComponents/commentsCard.css";
</style>