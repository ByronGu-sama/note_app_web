<script setup lang="ts">

import {ref} from "vue";
import router from "../../router";
import Waterfall from "../miniComponents/waterfall.vue";
import requestList from "../../requestAPI/requestList.ts";
import axios from "axios";

let canScroll = ref(true);
let noteList = ref([]);
let onLoading = ref(false);
let page = 1;
let limit = 20;

const toSearchPage = () => {
  router.push("/searchResult");
}

function getMoreNotes() {
  if(!canScroll.value || onLoading.value) return;
  onLoading.value = true;
  axios.get(`${requestList.NOTE_LIST}?page=${page}&limit=${limit}`).then(res => {
    noteList.value = res.data.data;
    page++
  }).catch(() => {
    canScroll.value = false;
  }).finally(() => {
    onLoading.value = false;
  })
}
</script>

<template>
  <div class="home">
    <div class="home-header">
      <img src="/src/assets/icons/home-logo.png" alt=""/>
      <div class="home-header-input-block" @click="toSearchPage">
        <img src="/src/assets/icons/search.png" alt=""/>
      </div>
    </div>
    <div class="home-body"
         v-infinite-scroll="getMoreNotes"
         :infinite-scroll-immediate="true"
         :infinite-scroll-disabled="!canScroll"
         :infinite-scroll-distance="400"
         :infinite-scroll-delay="800">
      <waterfall :data="noteList"></waterfall>
    </div>
  </div>
</template>

<style scoped>
@import "/src/assets/css/home/home.css";
</style>