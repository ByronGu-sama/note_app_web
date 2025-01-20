<script setup lang="ts">

</script>

<template>
  <div class="app">
<!--    223 148 85-->
    <router-view>
    </router-view>
    <div class="nav">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>
  .app {
    width: 800px;
    height: 650px;
    background-color: white;
    position: relative;
    border: none;
  }
  .nav {
    width: 100%;
    height: 50px;
    background-color: #535bf2;
    position: absolute;
    top: 600px;
    left: 0;
    border: none;
    display: flex;

  }
  .nav > div {

  }
</style>
