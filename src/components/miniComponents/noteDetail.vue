<script setup lang="ts">
import {ref, watch} from "vue";
import {useNoteStore} from "../../store/noteStore.ts"
import CommentsCard from "./commentsCard.vue";
import timeTools from "../../tools/timeTools.ts";
import type {ISendNoteContentModel} from "../../models/sendNoteContentModel.ts";
import {ElMessage} from "element-plus";
import axios from "axios";
import requestList from "../../requestAPI/requestList.ts";

const noteStore = useNoteStore();
const openCardStyle = {
  display: "block"
}
const closeCardStyle = {
  display: "none",
}
let curCardStyle = ref(closeCardStyle)
let comment = ref<ISendNoteContentModel>({nid:"", content:"", root_id:""})

// 关闭详情页
const closeCard = () => {
  noteStore.closeDetailCard()
}

// 关注/取关
const subscribe = () => {

}

const getMoreComments = () => {
  noteStore.getNoteComment(noteStore.noteDetail.nid)
}

// 发送一级评论
const sendComment = () => {
  comment.value.nid = noteStore.noteDetail.nid
  if (comment.value.nid == "") {
    return;
  }
  if (comment.value.content == "") {
    ElMessage({
      type: "warning",
      message: "评论不能为空哦～"
    })
    return
  }
  axios.post(`${requestList.NEW_NOTE_COMMENT}`, comment.value).then(res => {
    if (res.data.code == 200) {
      ElMessage({
        type: "success",
        message: "电波发送成功～"
      })
      noteStore.noteCommentsList.unshift(res.data.data)
    } else {
      ElMessage({
        type: "error",
        message: res.data.message
      })
    }
  }).finally(() => {
    comment.value.content = "";
  })
}

watch(() => noteStore.noteDetailHasLoaded, (n) => {
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
    <el-skeleton animated style="width: 100%; height: 100%;background-color: white" :loading="!noteStore.noteDetailHasLoaded">
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
                <el-image
                    fit="cover"
                    :src="pic"
                    :preview-teleported="true"
                    :preview-src-list="noteStore.noteDetail.pics"
                    :infinite="false"
                />
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div
          v-infinite-scroll="getMoreComments"
          :infinite-scroll-distance="50"
          :infinite-scroll-disabled="noteStore.noCommentMark"
          :infinite-scroll-immediate="false"
          class="note-detail-right">
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

        <div class="note-detail-right-middle-area">
          <el-input :autosize="{minRows: 1, maxRows: 10}" resize="none" type="textarea" v-model="comment.content" class="note-detail-right-middle-area-input"/>
          <button @click="sendComment()" class="note-detail-right-middle-area-btn">发送</button>
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
                :root_id="i.root_id"
                :nid="i.nid"
                :parent_id="i.cid"
            ></comments-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  padding: 0;
  margin: 0;
}
::-webkit-scrollbar {
  display: none;
}
.note-detail-wrapper {
  width: 900px;
  height: 590px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}
.note-detail {
  width: 900px;
  height: 590px;
  overflow: hidden;
  background-color: white;
}
.note-detail-exit-icon {
  position: absolute;
  top: 8px;
  left: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.note-detail-exit-icon > img {
  width: 30px;
  height: 30px;
}
.note-detail {
  display: flex;
}
.note-detail-left {
  flex: 65%;
  display: flex;
  align-items: center;
}
.note-detail-carousel {
  width: 100%;
  height: auto;
}
.note-detail-carousel-image-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
}
.note-detail-carousel-image {
  max-height: 100%;
  max-width: 100%;
}
.note-detail-right {
  flex: 35%;
  height: 590px;
  overflow-y: auto;
}
.note-detail-right-top-area {
  width: 100%;
  height: auto;
  color: #303133;
}
.note-detail-right-top-user-area {
  width: 100%;
  height: 70px;
  position: relative;
}
.note-detail-right-top-user-area span {
  position: absolute;
  left: 70px;
  top: 21px;
  font-size: 17px;
  font-weight: bold;
}
.note-detail-right-top-user-area button{
  width: 60px;
  height: 30px;
  position: absolute;
  top: 22px;
  right: 22px;
  border-radius: 15px;
  border: none;
  font-size: 12px;
  color: #303133;
  font-weight: bold;
}
.note-detail-right-middle-area {
  width: 100%;
  position: relative;
  margin-top: 10px;
  padding-left: 5px;
  box-sizing: border-box;
}
.note-detail-right-middle-area-input {
  width: calc(100% - 90px);
}
.note-detail-right-middle-area-btn {
  width: 60px;
  border: none;
  height: 30px;
  border-radius: 15px;
  position: absolute;
  right: 20px;
  font-size: 12px;
  color: #303133;
  font-weight: bold;
  cursor: pointer;
}
.note-detail-right-bottom-area {
  width: 100%;
}
.note-detail-right-bottom-detail-area {
  width: 100%;
  background-color: white;
}
.note-detail-right-bottom-detail-area-title {
  color: #242424;
  font-size: 18px;
  box-sizing: border-box;
  padding: 5px 7px 5px 7px;
}
.note-detail-right-bottom-detail-area-content {
  color: #303133;
  font-size: 16px;
  box-sizing: border-box;
  padding: 5px 7px 5px 7px;
}
.note-detail-right-bottom-detail-area-time {
  font-size: 12px;
  text-indent: 8px;
  color: #242424;
}
.note-detail-right-bottom-comments-area {
  width: 100%;
  margin-top: 20px;
}
</style>