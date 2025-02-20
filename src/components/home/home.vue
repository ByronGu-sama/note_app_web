<script setup lang="ts">

import {ref} from "vue";
import router from "../../router";

let canScroll = ref(false);

const toSearchPage = () => {
  router.push("/searchResult");
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
         :infinite-scroll-immediate="true"
         :infinite-scroll-distance="50"
         :infinite-scroll-delay="500"
         :infinite-scroll-disabled="canScroll"
    >

    </div>
  </div>
</template>

<style scoped>
@import "/src/assets/css/home/home.css";
</style>