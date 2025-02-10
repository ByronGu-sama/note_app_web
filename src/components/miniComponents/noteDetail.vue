<script setup lang="ts">
import {ref, watch} from "vue";
import {useNoteStore} from "../../store/noteStore.ts"
import CommentsCard from "./commentsCard.vue";
import timeTools from "../../tools/timeTools.ts";

const noteStore = useNoteStore();
const openCardStyle = {
  display: "block"
}
const closeCardStyle = {
  display: "none",
}

let curCardStyle = ref(closeCardStyle)

// 关闭详情页
const closeCard = () => {
  noteStore.showNoteCard = false
}

// 关注/取关
const subscribe = () => {

}

// const getMoreComments = () => {
//   noteStore.getNoteComment(noteStore.noteDetail.nid)
// }

watch(() => noteStore.showNoteCard, (n) => {
  if(n) {
    curCardStyle.value = openCardStyle
  } else {
    curCardStyle.value = closeCardStyle
    noteStore.closeDetailCard()
  }
})
</script>

<template>
  <div :style="curCardStyle" class="note-detail-wrapper">
    <el-skeleton animated style="width: 100%; height: 100%;" :loading="!noteStore.noteDetailHasLoaded">
      <template #template>
        <div style="width: 100%; height: 100%;display: flex;">
          <div style="height: 100%;display: flex;align-items: center;justify-content: center;flex: 65%">
            <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
          </div>
          <div style="height: 100%;flex: 35%">
            <el-skeleton-item variant="image" style="width: 50px; height: 50px;border-radius: 25px;margin-top: 10px" />
            <el-skeleton-item variant="text" style="width: 200px;height: 30px;margin-top: 10px"/>
            <el-skeleton-item variant="text" style="width: 300px;height: 20px;margin-top: 10px"/>
            <el-skeleton-item variant="text" style="width: 300px;height: 20px;margin-top: 10px"/>
            <el-skeleton-item variant="text" style="width: 300px;height: 20px;margin-top: 10px"/>
            <el-skeleton-item variant="image" style="width: 30px; height: 30px;border-radius: 15px;margin-top: 30px" />
            <el-skeleton-item variant="text" style="width: 300px;height: 25px;margin-top: 10px"/>
            <el-skeleton-item variant="image" style="width: 30px; height: 30px;border-radius: 15px;margin-top: 30px" />
            <el-skeleton-item variant="text" style="width: 300px;height: 25px;margin-top: 10px"/>
            <el-skeleton-item variant="image" style="width: 30px; height: 30px;border-radius: 15px;margin-top: 30px" />
            <el-skeleton-item variant="text" style="width: 300px;height: 25px;margin-top: 10px"/>
          </div>
        </div>
      </template>
    </el-skeleton>
    <div class="note-detail" v-show="noteStore.noteDetailHasLoaded">
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
              height="500px">
            <el-carousel-item v-for="(pic,index) in noteStore.noteDetail.pics" :key="index">
              <div class="note-detail-carousel-image-wrapper">
                <img
                    :src="pic"
                    alt=""
                    class="note-detail-carousel-image">
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="note-detail-right">
        <el-scrollbar height="590px">
          <div class="note-detail-right-top-area">
            <div class="note-detail-right-top-user-area">
              <el-avatar size="large" :src="noteStore.noteDetail.avatarUrl" style="position: absolute; top: 7px; left: 7px"/>
              <span>{{noteStore.noteDetail.username}}</span>
              <button @click="subscribe()">关注</button>
            </div>
            <div class="note-detail-right-bottom-detail-area">
              <div class="note-detail-right-bottom-detail-area-title">
                <span>{{noteStore.noteDetail.title}}</span>
              </div>
              <div class="note-detail-right-bottom-detail-area-content">
                <span>{{noteStore.noteDetail.content}}</span>
              </div>
              <div class="note-detail-right-bottom-detail-area-time">
                <span>{{timeTools.formatTime(noteStore.noteDetail.createdAt)}}</span>
              </div>
            </div>
          </div>

          <div class="note-detail-right-bottom-area" v-if="noteStore.noteCommentsHasLoaded">
            <div class="note-detail-right-bottom-comments-area">
              <comments-card
                  v-for="i in noteStore.noteCommentsList"
                  :key="i.cid"
                  :avatar-url="i.avatarUrl"
                  :username="i.username"
                  :content="i.content"
                  :likes_count="i.likes_count"
                  :published-at="i.created_at"
                  :children="i.children"
              ></comments-card>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../../assets/css/miniComponents/noteDetail.css";
</style>