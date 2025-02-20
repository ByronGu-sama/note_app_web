<script setup lang="ts">

</script>

<template>
  <div class="app">
    <router-view v-slot="{Component}">
      <keep-alive>
        <component :is="Component" :key="$route.fullPath" v-if="$route.meta.keepAlive" ></component>
      </keep-alive>
      <component :is="Component" :key="$route.fullPath" v-if="!$route.meta.keepAlive" ></component>
    </router-view>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
.app {
  width: 900px;
  height: 650px;
  background-color: white;
  position: relative;
  border: none;
  overflow: hidden;
}
</style>
