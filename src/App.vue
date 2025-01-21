<script setup lang="ts">

</script>

<template>
  <div class="app">
    <div class="header">
      <router-view/>
    </div>
    <div class="nav">
      <router-link to="/" class="router-link-active">
        <div class="nav-btn">
          <img src="./assets/icons/home1.png" alt="home"/>
          <br>
          <span>首页</span>
        </div>
      </router-link>
      <router-link to="/video" class="router-link-active">
        <div class="nav-btn">
          <img src="./assets/icons/video1.png" alt="video"/>
          <br>
          <span>视频</span>
        </div>
      </router-link>
      <div class="add">
        <img src="./assets/icons/add.png" alt="add"/>
      </div>
      <router-link to="/message" class="router-link-active">
        <div class="nav-btn">
          <img src="./assets/icons/msg1.png" alt="msg"/>
          <br>
          <span>消息</span>
        </div>
      </router-link>
      <router-link to="/profile" class="router-link-active">
        <div class="nav-btn">
          <img src="./assets/icons/user1.png" alt="user"/>
          <br>
          <span>我的</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .app {
    width: 900px;
    height: 650px;
    background-color: white;
    position: relative;
    border: none;
  }
  .header {
    width: 100%;
    height: 590px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }
  .router-link-active {
    text-decoration: none;
  }
  .nav {
    width: 100%;
    height: 60px;
    position: absolute;
    top: 590px;
    left: 0;
    border: none;
    display: flex;
    justify-content: space-around;
  }
  .nav-btn {
    width: 32px;
    height: 55px;
    padding-top: 5px;
    font-size: 13px;
    color: rgb(83, 83, 83);
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }
  .nav-btn > img {
    width: 26px;
    height: 26px;
  }
  .add {
    padding-top: 2px;
  }
  .add > img {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
</style>
