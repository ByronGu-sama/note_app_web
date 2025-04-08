<script setup lang="ts">
import {onMounted, ref} from "vue";
import router from "./router";
import {useUserStore} from "./store/userStore.ts";

const userStore = useUserStore();
const cachedPage = ref<string[]>(["main"]);

router.beforeEach((to, from, next) => {
  if (from.name === "SearchResult" && to.name === "NoteDetail" && cachedPage.value.indexOf("searchResult") === -1) {
    // 从 搜索结果页 跳转到 笔记详情页 时缓存搜索结果页
    cachedPage.value.push("searchResult");
  } else if (from.name === "SearchResult") {
    // 从 搜索结果页 跳转到 其他页面 时取消缓存搜索结果页
    const index = cachedPage.value.indexOf("searchResult");
    if (index !== -1) {
      cachedPage.value.splice(index, 1);
    }
  } else if(from.name && from.meta.keepAlive && cachedPage.value.indexOf(String(from.name)) === -1){
    // 其他情况下根据 meta.keepAlive 判断是否缓存页面, keep-alive的include属性根据页面名称判定是否缓存，非路由名称
    let temp = String(from.name);
    cachedPage.value.push(temp.charAt(0).toLowerCase() + temp.slice(1));
  }
  next();
});
// 初始化时家在当前用户的信息
onMounted(() => {
  userStore.getUserInfo()
})
</script>

<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedPage">
        <component :is="Component" />
      </keep-alive>
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
