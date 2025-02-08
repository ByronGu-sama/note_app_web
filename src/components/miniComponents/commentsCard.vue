<script setup lang="ts">

</script>

<template>
<div class="comment-card">

  <div class="comment-card-userInfo">
    <div class="comment-card-userInfo-left">
      <el-avatar style="position: absolute;left: 5px;top: 5px;cursor: pointer">user</el-avatar>
      <span class="comment-card-username">username</span>
    </div>
    <div class="comment-card-userInfo-right">
      <img src="../../assets/icons/thumbsUp.png" alt="点赞">
      <span>1000</span>
    </div>
  </div>

  <div class="comment-card-comment">
    <span>测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论</span>
  </div>

  <div class="comment-card-bottom">
    2022年02月22日22时
  </div>
</div>
</template>

<style scoped>
@import "../../assets/css/miniComponents/commentsCard.css";
</style>