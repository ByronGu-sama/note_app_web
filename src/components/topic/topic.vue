<script setup lang="ts">

</script>

<template>
<div class="topic-wrapper">
<!--    统计进7天用户兴趣关键词-->
<!--  展示相关的热门笔记-->

  <div class="section-1">
    <div class="section-1-circle-1"></div>
    <div class="section-1-circle-2"></div>
    <span class="title">Trending</span>
    <div class="carousel-wrapper">
      <el-carousel
          height="340px"
          trigger="click"
          interval="5000"
          arrow="never">
        <el-carousel-item>
          <img src="/src/assets/topicPic/1.webp" alt=""/>
        </el-carousel-item>
        <el-carousel-item>
          <img src="/src/assets/topicPic/2.webp" alt=""/>
        </el-carousel-item>
        <el-carousel-item>
          <img src="/src/assets/topicPic/3.webp" alt=""/>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
  <div class="section-2">
    <img src="/src/assets/topicPic/p1.jpg" alt=""/>
    <span class="section-2-title">纸钞屋</span>
    <p class="section-2-content">"Power's a lot like real estate.</p>
    <p class="section-2-content">It's all about location, location, location.</p>
    <p class="section-2-content">The closer you are to the source,the higher your property value."</p>
  </div>
  <div class="section-3">
  </div>
</div>
</template>

<style scoped>
@import "/src/assets/css/topic/topic.css";
</style>