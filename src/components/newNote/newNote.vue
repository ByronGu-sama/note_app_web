<script setup lang="ts">
import {reactive, ref} from "vue";
import { Plus } from '@element-plus/icons-vue'
import {ElMessage, type UploadUserFile} from "element-plus";
import axios from "axios";
import requestList from "../../requestAPI/requestList.ts";
import router from "../../router";

let fileList = reactive<UploadUserFile[]>([])
let title = ref('')
let content = ref('')
let loading = ref(false)

const uploadNote = () => {
  if(title.value === "") {
    ElMessage({
      type: 'warning',
      message: "标题不能为空"
    })
    return
  }

  if(content.value === "") {
    ElMessage({
      type: 'warning',
      message: "内容不能为空"
    })
    return
  }

  if(fileList.length === 0){
    ElMessage({
      type: 'warning',
      message: "图片不能为空"
    })
    return
  }
  loading.value = true
  let forms = new FormData()
  forms.append("title", title.value)
  forms.append("content", content.value)
  forms.append("tags", "测试标签")
  fileList.forEach((file:any) => {
    forms.append("file", file.raw)
  })

  axios.post(requestList.NEW_NOTE, forms, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    if(res.data.code == 200){
      ElMessage({
        type: 'success',
        message: "已发布"
      })
      router.push('/home')
    }
  }).catch(() => {
    ElMessage({
      type: 'warning',
      message: "发布失败"
    })
  }).finally(() => {
    loading.value = false
  })
}

const handleUpload = (_:any, itemList:any) => {
  fileList = itemList
}
</script>

<template>
<div class="newNote" v-loading.fullscreen.lock="loading" element-loading-text="上传中～">
  <div class="newNote-pics-area">
    <el-upload
        :file-list="fileList"
        list-type="picture-card"
        :multiple="true"
        :limit="10"
        :auto-upload="false"
        :on-change="handleUpload"
        accept=".jpeg, .png, .jpg, .webp, .heif, .heic">
      <el-icon><Plus/></el-icon>
    </el-upload>
  </div>
  <div class="newNote-content-area">
    <input placeholder="写下你的标题吧" class="newNote-content-title" v-model="title" maxlength="30"/>
    <br>
    <textarea placeholder="写点什么呢？" class="newNote-content-body" v-model="content" maxlength="300"></textarea>
  </div>
  <div class="newNote-btn-area">
    <button class="submit-btn">删除</button>
    <button class="submit-btn" @click="uploadNote">发布</button>
  </div>
</div>
</template>

<style scoped>
@import "/src/assets/css/newNote/newNote.css";
</style>