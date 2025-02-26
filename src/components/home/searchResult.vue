<script setup lang="ts">
import {Search } from '@element-plus/icons-vue'
import {ref, watch} from "vue";
import {ElMessage} from "element-plus";
import axios from "axios";
import requestList from "../../requestAPI/requestList.ts";
import Waterfall from "../miniComponents/waterfall.vue";
import router from "../../router";

let keyword = ref<string>('');
let searchResult = ref<any>([]);
let canSearch = ref<boolean>(true);
let originKeyword = "";
let page = 1;
let limit = 15;
let showSearchResult = ref<boolean>(true);
let clearSearch = ref<boolean>(false);

const getNoteList = () => {
  if(keyword.value === "") {
    ElMessage.warning("关键词不能为空")
    return
  }
  if(originKeyword !== keyword.value) {
    clearSearch.value = !clearSearch.value;
    searchResult.value = [];
    canSearch.value = true;
    page = 1;
    originKeyword = keyword.value;
  }
  if(!canSearch.value){
    return;
  }
  axios.get(`${requestList.SEARCH_NOTE_LIST}/${keyword.value}?page=${page}&limit=${limit}`).then((res) => {
    if(res.data.data.length < limit) {
      canSearch.value = false;
    }
    searchResult.value = res.data.data
    page++
  }).catch(() => {
    canSearch.value = false;
  })
}

const exit = () => {
  router.back();
}

watch(showSearchResult, (n) => {
  console.log(n)
})
</script>

<template>
<div class="searchResult-wrapper">
  <div class="searchResult-top">
    <img src="/src/assets/icons/exit.png" @click="exit" class="searchResult-exit-icon" alt="">
    <el-input
        :prefix-icon="Search"
        v-model="keyword"
        :maxlength="200"
        :clearable="true"
        :autofocus="true"
        @keyup.enter.native="getNoteList"
        style="width: 94%; position: absolute; right: 7px"/>
  </div>
  <div
      class="searchResult-body"
      :v-infinite-scroll="getNoteList"
      :infinite-scroll-delay="1000"
      :infinite-scroll-distance="50"
      :infinite-scroll-disabled="canSearch">
    <waterfall
        v-if="showSearchResult"
        :data="searchResult"
        :clearData="clearSearch">
    </waterfall>
  </div>
</div>
</template>

<style scoped>
@import "/src/assets/css/home/searchResult.css";
</style>