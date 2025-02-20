<script setup lang="ts">
import {onMounted, ref} from "vue";
import CommentsCard from "./commentsCard.vue";
import timeTools from "../../tools/timeTools.ts";
import type {ISendNoteContentModel} from "../../models/sendNoteContentModel.ts";
import {ElMessage} from "element-plus";
import axios from "axios";
import requestList from "../../requestAPI/requestList.ts";
import type {INoteDetailModel} from "../../models/noteDetailModel.ts";
import type {INoteCommentModel} from "../../models/noteCommentModel.ts";
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import router from "../../router";

const noteDetail = ref<INoteDetailModel>({
  nid: "",
  avatarUrl: "",
  categoryId: "",
  collectionsCount: 0,
  commentsCount: 0,
  content: "",
  createdAt: "",
  likesCount: 0,
  pics: [],
  public: 0,
  sharesCount: 0,
  tags: "",
  title: "",
  uid: 0,
  updatedAt: "",
  username: "",
  viewsCount: 0
}); // 笔记详情
const noteCommentsList = ref<INoteCommentModel[]>([]); // 评论列表
let comment = ref<ISendNoteContentModel>({nid:"", content:"", root_id:""}); // 待发送的评论
const limit = 5; // 评论数量限制
let page = 1; // 分页
let showDetail = ref(false); // 是否可以展示笔记数据
let showComment = ref(false); // 是否可以展示评论
let hasMoreCommentMark = ref(true); // 是否还有未加载评论
let currentNid:string = "" // 当前的note id
let loadingCommentMark = ref(false) // 是否正在加载评论

// 关闭详情页
const closeCard = () => {
  router.back()
}

// 关注/取关
const subscribe = () => {
}

// 发送一级评论
const sendComment = () => {
  comment.value.nid = noteDetail.value.nid
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
      noteCommentsList.value.unshift(res.data.data)
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

// 获取指定帖子详情
const getNoteDetail = () => {
  noteDetail.value = {
    nid: "",
    avatarUrl: "",
    categoryId: "",
    collectionsCount: 0,
    commentsCount: 0,
    content: "",
    createdAt: "",
    likesCount: 0,
    pics: [],
    public: 0,
    sharesCount: 0,
    tags: "",
    title: "",
    uid: 0,
    updatedAt: "",
    username: "",
    viewsCount: 0
  }
  axios.get(`${requestList.GET_NOTE_DETAIL}/${currentNid}`).then((res) => {
    noteDetail.value = res.data.data;
    showDetail.value = true;
  }).catch(() => {
    ElMessage({
      type: "error",
      message: "笔记加载失败～"
    })
  })
}

// 获取评论
const getNoteComment = () => {
  if(!hasMoreCommentMark.value || loadingCommentMark.value) {
    return
  }
  loadingCommentMark.value = true;
  axios.get(`${requestList.GET_NOTE_COMMENT_LIST}/${currentNid}?page=${page}&limit=${limit}`).then((res) => {
    if(!showComment.value) {
      showComment.value = true;
    }
    if(res.data.data.length < limit) {
      hasMoreCommentMark.value = false
    }
    page++
    for (let i of res.data.data) {
      noteCommentsList.value.push(i)
    }
  }).catch(() => {
    hasMoreCommentMark.value = false
  }).finally(() => {
    loadingCommentMark.value = false;
  })
}

// 初始化note详情
const initNoteDetail = () => {
  let route = useRoute();
  let nid = route.params.nid

  if (Array.isArray(nid)) {
    nid = nid[0]
  }

  if(nid === undefined || nid === "") {
    router.back();
    return;
  }
  currentNid = nid;
  getNoteDetail()
  getNoteComment()
}

onMounted(() => {
  initNoteDetail()
})
</script>

<template>
  <div class="note-detail-wrapper">
    <el-skeleton animated style="width: 100%; height: 100%;background-color: white" :loading="!showDetail">
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
    <div class="note-detail" v-if="showDetail">
      <div class="note-detail-left">
        <div @click="closeCard()" class="note-detail-exit-icon">
          <img src="../../assets/icons/exit.png" alt="close"/>
        </div>
        <div class="note-detail-carousel">
          <el-carousel
              arrow="always"
              trigger="click"
              :autoplay="false"
              indicator-position="none"
              :loop="false"
              height="500px">
            <el-carousel-item v-for="(pic,index) in noteDetail.pics" :key="index">
              <div class="note-detail-carousel-image-wrapper">
                <el-image
                    style="width: 100%; height: 100%;"
                    fit="contain"
                    :src="pic"
                    :preview-teleported="true"
                    :preview-src-list="noteDetail.pics"
                    :infinite="false">
                  <template #error>
                    <div class="image-slot">
                      <el-icon><icon-picture/></el-icon>
                    </div>
                  </template>
                </el-image>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div
          v-infinite-scroll="getNoteComment"
          :infinite-scroll-distance="50"
          :infinite-scroll-disabled="!hasMoreCommentMark"
          :infinite-scroll-immediate="false"
          class="note-detail-right">
        <div class="note-detail-right-top-area">
          <div class="note-detail-right-top-user-area">
            <el-avatar size="large" :src="noteDetail.avatarUrl" style="position: absolute; top: 7px; left: 7px"/>
            <span>{{noteDetail.username}}</span>
            <button @click="subscribe()">关注</button>
          </div>
          <div class="note-detail-right-bottom-detail-area">
            <div class="note-detail-right-bottom-detail-area-title">
              <span>{{noteDetail.title}}</span>
            </div>
            <div class="note-detail-right-bottom-detail-area-content">
              <span>{{noteDetail.content}}</span>
            </div>
            <div class="note-detail-right-bottom-detail-area-time">
              <span>{{timeTools.formatTime(noteDetail.createdAt)}}</span>
            </div>
          </div>
        </div>

        <div class="note-detail-right-middle-area">
          <el-input :autosize="{minRows: 1, maxRows: 10}" resize="none" type="textarea" v-model="comment.content" class="note-detail-right-middle-area-input"/>
          <button @click="sendComment()" class="note-detail-right-middle-area-btn">发送</button>
        </div>

        <div class="note-detail-right-bottom-area" v-if="showComment">
          <div class="note-detail-right-bottom-comments-area">
            <comments-card
                v-for="i in noteCommentsList"
                :key="i.cid"
                :avatar-url="i.avatarUrl"
                :username="i.username"
                :content="i.content"
                :likes_count="i.likes_count"
                :published-at="i.created_at"
                :root_id="i.root_id"
                :nid="i.nid"
                :parent_id="i.cid">
            </comments-card>
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
  padding: 10px;
  box-sizing: border-box;
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