<script setup lang="ts">
import timeTools from "../../tools/timeTools.ts";
import {onBeforeMount, onDeactivated, ref, watch} from "vue";
import type {ISendNoteContentModel} from "../../models/sendNoteContentModel.ts";
import axios from "axios";
import requestList from "../../requestAPI/requestList.ts";
import {ElMessage} from "element-plus";
import {useUserStore} from "../../store/userStore.ts";

const userStore = useUserStore();
const props = defineProps(["avatarUrl", "username", "content", "from_id","likes_count", "publishedAt", "root_id", "nid", "cid", "parent_id", "liked"]);
let comment = ref<ISendNoteContentModel>({
  nid: "",
  content: "",
  root_id: "",
  parent_id: "",
});
let showMainReplyArea = ref(false); // 展示主评论的回复区域
let showSubReplyAreaIndex = ref(0); // 展示子评论的回复区域
let page = 1; // 页数
let limit = 5; //分页限制
let noCommentMark = ref(false); // 是否已无法获取评论
let children = ref<any[]>([]);
let timer:any = null; // 处理鼠标长按事件的定时器
let pressing = true; // 是否按下鼠标
let showPanel = ref(false); // 是否显示删除评论的遮罩
let data = ref<any>({
  avatarUrl: props.avatarUrl,
  username: props.username,
  content: props.content,
  from_id: props.from_id,
  likes_count: props.likes_count,
  publishedAt: props.publishedAt,
  root_id: props.root_id,
  nid: props.nid,
  cid: props.cid,
  parent_id: props.parent_id,
  liked: props.liked,
});
let showComment = ref(true); // 是否展示当前评论

// 获取子评论
const getSubComments = () => {
  if(props.nid === "" || page !== 1 && noCommentMark) {
    return
  }
  if(page === 1) {
    children.value = []
    noCommentMark.value = false
  }
  axios.get(`${requestList.GET_NOTE_SUB_COMMENT_LIST}/${props.nid}/${props.root_id}?page=${page}&limit=${limit}`).then((res) => {
    if(res.data.code === 200) {
      page++
      for(let i of res.data.data) {
        children.value.push(i)
      }
      if (res.data.data.length < limit) {
        noCommentMark.value = true
      }
    }
  })
}

// 发送二级评论
const replyComment = (parent_name:string) => {
  comment.value.nid = props.nid
  comment.value.root_id = props.root_id
  comment.value.parent_id = props.parent_id
  axios.post(`${requestList.NEW_NOTE_COMMENT}`, comment.value).then(res => {
    if(res.data.code === 200) {
      let temp = res.data.data
      temp.parent_name = parent_name
      children.value.unshift(temp);
    } else {
      ElMessage({
        type: "error",
        message: "发送失败啦"
      })
    }
  }).finally(() => {
    showMainReplyArea.value = false;
    comment.value.content = "";
    showSubReplyAreaIndex.value = 0
  })
}

// 点赞评论
const thumbsUp = (liked:boolean, cid:string) => {
  if(cid === "") {
    return
  }
  if(!liked){
    axios.get(`${requestList.LIKE_NOTE_COMMENT}/${cid}`)
  } else {
    axios.get(`${requestList.DISLIKE_NOTE_COMMENT}/${cid}`)
  }
}

const listenPress = (from_id:number) => {
  if(userStore.userInfo.uid != from_id) {
    return;
  }
  pressing = true;
  timer = setInterval(() => {
    if(pressing) {
      showPanel.value = true;
    }
  }, 600)
}

const listenUnPress = () => {
  pressing = false
  clearInterval(timer)
}

// 删除评论
const delComment = (from_id:number, cid:string) => {
  if(from_id == 0 || from_id == undefined || cid == "" || cid == undefined || userStore.userInfo.uid != from_id) {
    return;
  }
  axios.delete(`${requestList.DEl_NOTE_COMMENT}/${cid}`)
  showComment.value = false
}

watch(() => props, () => {
  data.value = {...props};
}, {
  immediate: true,
  deep: true
})

onBeforeMount(() => {
  getSubComments();
})
onDeactivated(() => {
  clearInterval(timer)
})
</script>

<template>
<div class="comment-card" v-if="showComment">
  <div class="comment-card-mainContent" @mousedown="listenPress(data.from_id)" @mouseup="listenUnPress()">
    <div class="comment-card-panel-mask" v-if="showPanel">
      <button class="cancelDelCommentBtn" @click="showPanel = false">取消</button>
      <button class="delCommentBtn" @click="delComment(data.from_id, data.cid)">删除</button>
    </div>
    <div class="comment-card-userInfo">
      <div class="comment-card-userInfo-left">
        <el-avatar :src="data.avatarUrl" style="position: absolute;left: 5px;top: 5px;cursor: pointer"/>
        <span class="comment-card-username">{{ data.username }}</span>
      </div>
      <div class="comment-card-userInfo-right">
        <img src="../../assets/icons/like1.png" alt="" v-if="!data.liked" @click="thumbsUp(data.liked, data.cid); data.likes_count++;data.liked = true">
        <img src="../../assets/icons/like2.png" alt="" v-else @click="thumbsUp(data.liked, data.cid); data.likes_count--; data.liked = false">
        <span>{{data.likes_count}}</span>
      </div>
    </div>
    <div class="comment-card-comment">
      <span @click="showMainReplyArea = !showMainReplyArea">{{data.content}}</span>
    </div>
    <div class="comment-card-reply-area" v-if="showMainReplyArea">
      <el-input :autosize="{minRows: 1, maxRows: 3}" resize="none" type="textarea" v-model="comment.content" class="comment-card-reply-area-input"/>
      <button @click="replyComment(data.username)" class="comment-card-reply-area-btn">回复</button>
    </div>
    <div class="comment-card-bottom">
      <span>{{timeTools.formatTime(data.publishedAt)}}</span>
    </div>
  </div>
 <div class="comment-card-subContent" v-if="children.length > 0">
   <div v-for="(item, index) in children" :key="index+1" class="comment-card-subContent-body">

     <div class="comment-card-subContent-userInfo">
       <div class="comment-card-subContent-userInfo-left">
         <el-avatar size="small" :src="item.avatarUrl" style="position: absolute;left: 5px;top: 5px;cursor: pointer"/>
         <span class="comment-card-subContent-username">{{ item.username }}</span>
       </div>
       <div class="comment-card-subContent-userInfo-right">
         <img src="../../assets/icons/like1.png" alt="" v-if="!item.liked" @click="thumbsUp(item.liked, item.cid); item.likes_count++; item.liked = true">
         <img src="../../assets/icons/like2.png" alt="" v-else @click="thumbsUp(item.liked, item.cid); item.likes_count--; item.liked = false">
         <span>{{item.likes_count}}</span>
       </div>
     </div>

     <div class="comment-card-subContent-comment"  @click="showSubReplyAreaIndex ^= (index+1)">
       <span>回复</span>
       <span style="color: #ca5800">{{item.parent_name}}</span>
       <span>：{{item.content}}</span>
     </div>

     <div class="comment-card-reply-area" v-if="showSubReplyAreaIndex == index+1">
       <el-input :autosize="{minRows: 1, maxRows: 3}" resize="none" type="textarea" v-model="comment.content" class="comment-card-reply-area-input"/>
       <button @click="replyComment(item.username)" class="comment-card-reply-area-btn">回复</button>
     </div>

     <div class="comment-card-subContent-bottom">
       <span>{{timeTools.formatTime(item.created_at)}}</span>
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
.comment-card {
  width: 100%;
  margin-top: 10px;
  position: relative;
}
.comment-card-userInfo {
  width: 100%;
  height: 50px;
  display: flex;
  color: #303133;
}
.comment-card-mainContent {
  width: 100%;
  height: auto;
  position: relative;
}
.comment-card-panel-mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.delCommentBtn, .cancelDelCommentBtn {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  font-size: 14px;
  margin: 0 15px;
  border: none;
  cursor: pointer;
  color: white;
}
.cancelDelCommentBtn {
  background-color: rgb(99, 200, 86);
}
.delCommentBtn {
  background-color: rgb(237, 106, 94);
}
.comment-card-userInfo-left {
  width: calc(100% - 50px);
  height: 50px;
  position: relative;
}
.comment-card-userInfo-right {
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #303133;
}
.comment-card-userInfo-right img {
  width: 24px;
  height: 24px;
  margin-top: 8px;
  cursor: pointer;
}
.comment-card-userInfo-right span {
  font-size: 12px;
}
.comment-card-username {
  position: absolute;
  top: 12px;
  left: 50px;
  font-size: 15px;
}
.comment-card-comment {
  width: 100%;
  height: calc(100% - 80px);
  box-sizing: border-box;
  padding: 5px;
  font-size: 15px;
  color: #303133;
  text-indent: 3px;
}
.comment-card-reply-area {
  width: 100%;
  position: relative;
  margin-top: 10px;
  padding-left: 5px;
  box-sizing: border-box;
}
.comment-card-reply-area-input {
  width: calc(100% - 90px);
}
.comment-card-reply-area-btn {
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
.comment-card-bottom {
  width: 100%;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  text-indent: 8px;
  color: #606266;
}
.comment-card-subContent {
  width: 100%;
  height: auto;
}
.comment-card-subContent-body {
  width: 100%;
  padding-left: 10px;
  box-sizing: border-box;
  margin-top: 10px;
}
.comment-card-subContent-userInfo {
  width: 100%;
  height: 35px;
  color: #303133;
  display: flex;
}
.comment-card-subContent-userInfo-left {
  width: calc(100% - 50px);
  height: 35px;
  position: relative;
}
.comment-card-subContent-username {
  position: absolute;
  top: 6px;
  left: 33px;
  font-size: 13px;
}
.comment-card-subContent-userInfo-right {
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
  box-sizing: border-box;
}
.comment-card-subContent-userInfo-right img {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.comment-card-subContent-userInfo-right span {
  font-size: 12px;
}
.comment-card-subContent-comment {
  width: 100%;
  height: calc(100% - 80px);
  box-sizing: border-box;
  padding: 5px;
  font-size: 13px;
  color: #303133;
  text-indent: 3px;
}
.comment-card-subContent-bottom {
  width: 100%;
  height: 20px;
  font-size: 10px;
  line-height: 20px;
  text-indent: 8px;
  color: #606266;
}
</style>