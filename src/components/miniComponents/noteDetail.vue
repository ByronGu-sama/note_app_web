<script setup lang="ts">
import {ref, watch} from "vue";
import {useNoteStore} from "../../store/noteStore.ts"
import CommentsCard from "./commentsCard.vue";

const noteStore = useNoteStore();
const openCardStyle = {
  width: "900px",
  height: "590px",
  opacity: "1",
  zIndex: 999,
}
const closeCardStyle = {
  width: "900px",
  height: "590px",
  opacity: "0",
  zIndex: -999,
}
let curCardStyle = ref(openCardStyle)

// 关闭详情页
const closeCard = () => {
  noteStore.showNoteDetail = false
}

// 关注/取关
const subscribe = () => {

}

watch(() => noteStore.showNoteDetail, (n) => {
  if(n) {
    curCardStyle.value = openCardStyle
  } else {
    curCardStyle.value = closeCardStyle
  }
})
</script>

<template>
<div class="note-detail" :style="curCardStyle">
  <div class="note-detail-left">
    <div @click="closeCard()" class="note-detail-exit-icon">
      <img src="../../assets/icons/exit.png" alt="close" />
    </div>
    <div class="note-detail-carousel">
      <el-carousel
          arrow="always"
          trigger="click"
          :autoplay="false"
          indicator-position="none"
          :loop="false"
          :motion-blur="true"
          height="500px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
  <div class="note-detail-right">

    <div class="note-detail-right-top-area">
      <div class="note-detail-right-top-user-area">
        <el-avatar size="large" v-if="noteStore.noteDetail.avatarUrl" :src="noteStore.noteDetail.avatarUrl" style="position: absolute; top: 7px; left: 7px"/>
        <span v-if="noteStore.noteDetail.username">{{noteStore.noteDetail.username}}</span>
        <button @click="subscribe()">关注</button>
      </div>
    </div>

    <div class="note-detail-right-bottom-area">
      <el-scrollbar height="520px">
        <div class="note-detail-right-bottom-detail-area">
          <div class="note-detail-right-bottom-detail-area-title">
            <span>hello，测试标题</span>
          </div>
          <div class="note-detail-right-bottom-detail-area-content">
            <span>测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容</span>
          </div>
        </div>
        <div class="note-detail-right-bottom-comments-area">
          <comments-card
          v-for="i in 10"
          :key="i"
          ></comments-card>
        </div>
      </el-scrollbar>
    </div>

  </div>
</div>
</template>

<style scoped>
@import "../../assets/css/miniComponents/noteDetail.css";
</style>