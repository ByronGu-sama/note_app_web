<script setup lang="ts">
import {nextTick, onMounted, ref, watch} from "vue";
import {ElMessage} from "element-plus";
import {Position} from '@element-plus/icons-vue'
import {useUserStore} from "../../store/userStore.ts";
import {useMessageStore} from "../../store/messageStore.ts"
import requestList from "../../requestAPI/requestList.ts";

interface message {
  from_id: number;
  from_name: string,
  from_avatar: string,
  to_id: number,
  to_name: string,
  type: number,
  content: string,
  mediaType: number,
  url: string,
  pub_time: string,
  group_id: string,
}

const userStore = useUserStore();
const messageStore = useMessageStore();
let inputMsg = ref<message>({
  from_id: 0,
  from_name: "",
  from_avatar: "",
  to_id: 0,
  to_name: "",
  type: 1,
  content: "",
  mediaType: 1,
  url: "",
  pub_time: "",
  group_id: ""
});
let curWebsocket:any = null;
let msgScrollbar = ref(); // 聊天区域滚动条ref
let msgWrap = ref(); //聊天区域div ref

const sendMessage = () => {
  if(inputMsg.value.content == "") {
    ElMessage.warning("不能发送空白消息哦~");
    return;
  }
  if(curWebsocket !== null && curWebsocket.readyState == WebSocket.OPEN) {
    const curTime = new Date(new Date().getTime() + 8 * 3600 * 1000);
    inputMsg.value.to_id = Number(messageStore.curMsgTarget.to_id === userStore.userInfo.uid?messageStore.curMsgTarget.from_id:messageStore.curMsgTarget.to_id);
    inputMsg.value.to_name = String(messageStore.curMsgTarget.to_name === userStore.userInfo.username?messageStore.curMsgTarget.from_name:messageStore.curMsgTarget.to_name);
    inputMsg.value.pub_time = curTime.toISOString();
    inputMsg.value.from_id =Number(userStore.userInfo.uid);
    inputMsg.value.from_name = String(userStore.userInfo.username);
    inputMsg.value.from_avatar = String(userStore.userInfo.avatarUrl);
    curWebsocket.send(JSON.stringify(inputMsg.value));
    let temp = {...inputMsg.value};
    messageStore.pushMsgToList(inputMsg.value.from_id, inputMsg.value.from_name, inputMsg.value.to_id, inputMsg.value.to_name, temp);
    inputMsg.value.content = "";
    nextTick(() => {
      msgScrollbar.value.setScrollTop(msgWrap.value.clientHeight);
    })
  } else {
    ElMessage.warning("客户端未连接");
  }
}

const messageListener = (e:any) => {
  let msg:message = JSON.parse(e.data);
  messageStore.pushMsgToList(msg.from_id, msg.from_name, msg.to_id, msg.to_name, msg)
  nextTick(() => {
    setTimeout(() => {
      msgScrollbar.value.setScrollTop(msgWrap.value.clientHeight);
    },150)
  })
}

const changeMsgTarget = (fromId:number, fromName:string, toId:number, toName:string) => {
  messageStore.updateMsgTarget(fromId, fromName, toId, toName);
}

// 页面刷新前关闭ws连接
window.addEventListener("beforeunload", () => {
  if(curWebsocket !== null) {
    curWebsocket.close();
  }
});

watch(() => messageStore.curMsgTarget, (n) => {
  if(n.mid === "") {
    return
  }
  messageStore.createNewDialog(n.from_id, n.from_name, n.to_id, n.to_name);
}, {
  immediate: true,
  deep: true,
})

onMounted(() => {
  // 进入页面时初始化ws
  let token = localStorage.getItem("token");
  curWebsocket = new WebSocket(`${requestList.CONNECT_WS}?t=${token}`);

  curWebsocket.onopen = () => {
    ElMessage.success("客户端连接成功");
  }

  curWebsocket.onclose = () => {
    ElMessage.success("客户端已关闭");
  }

  curWebsocket.onmessage = (e:any) => {
    messageListener(e)
  }

  curWebsocket.onclose = () => {
    ElMessage.success("已关闭");
  }
})
</script>

<template>
<div class="message">
  <div class="message-left">
    <div>
      <div class="message-list-item" v-for="(v, k) in messageStore.msgList" :key="k" @click="changeMsgTarget(v[0], v[1], v[2], v[3])">
        <span v-if="userStore.userInfo.uid === v[0]">{{v[3]}}</span>
        <span v-if="userStore.userInfo.uid === v[2]">{{v[1]}}</span>
      </div>
    </div>
  </div>
  <div class="message-right">
    <div class="message-right-top">
      <span class="message-right-top-title" v-if="userStore.userInfo.username === messageStore.curMsgTarget.to_name">{{messageStore.curMsgTarget.from_name}}</span>
      <span class="message-right-top-title" v-if="userStore.userInfo.username === messageStore.curMsgTarget.from_name">{{messageStore.curMsgTarget.to_name}}</span>
    </div>
    <div class="message-right-bottom" v-if="messageStore.msgList[messageStore.curMsgTarget.mid]">
      <el-scrollbar height="508px" ref="msgScrollbar">
        <div class="message-list-wrap" ref="msgWrap">

          <transition-group name="message-list" tag="message">
            <div v-for="(item,index) in messageStore.msgList[messageStore.curMsgTarget.mid][4]" :key="index" class="message-item">

              <div class="message-item-left" v-if="item.from_id !== userStore.userInfo.uid">
                <el-avatar :src="item.from_avatar" alt="user"/>
                <div class="message-area">
                  <span>{{item.content}}</span>
                </div>
              </div>

              <div class="message-item-right" v-if="item.from_id === userStore.userInfo.uid">
                <div class="message-area">
                  <span>{{item.content}}</span>
                </div>
                <el-avatar :src="item.from_avatar" alt="user"/>
              </div>

            </div>
          </transition-group>

        </div>
      </el-scrollbar>
    </div>
    <div class="message-comment-area">
      <el-input v-model="inputMsg.content" :disabled="messageStore.curMsgTarget.mid === ''">
        <template #append>
          <el-button :icon="Position" @click="sendMessage"/>
        </template>
      </el-input>
    </div>
  </div>
</div>
</template>

<style scoped>
@import "/src/assets/css/message/message.css";
</style>