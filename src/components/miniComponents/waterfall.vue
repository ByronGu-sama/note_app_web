<script setup lang="ts">
import type {ISurfaceNote} from "../../models/surfaceNoteModel.ts";
import {reactive, ref, toRaw, watch} from "vue";
import NoteCard from "./noteCard.vue";
import router from "../../router";

interface gridArrItem {
  id: number;
  height: number;
  data: ISurfaceNote[];
}
const props = defineProps(["data", "clearData"])
let gridArr = reactive<gridArrItem[]>([
  {
    id: 1,
    height: 0,
    data: []
  },
  {
    id: 2,
    height: 0,
    data: []
  },
  {
    id: 3,
    height: 0,
    data: []
  },
  {
    id: 4,
    height: 0,
    data: []
  }
]);
let curScrollHeight = ref(0); //记录当前的滚动位置

// 将笔记推送至瀑布流队列
const pushToArrByImgHeight = (notesArr:ISurfaceNote[]) => {
  for (let i of notesArr) {
    let minHeightIndex = 0;
    for (let j = 1; j < gridArr.length; j++) {
      if (gridArr[minHeightIndex].height > gridArr[j].height) {
        minHeightIndex = j;
      }
    }
    gridArr[minHeightIndex].data.push(i);
    gridArr[minHeightIndex].height += i.cover_height!;
  }
}

// 跳转至详情页
const toDetail = (nid: string) => {
  router.push(`/noteDetail/${nid}`);
}

watch(() => props.data, (n) => {
  if(n.length > 0) {
    pushToArrByImgHeight(toRaw(n))
  }
})

watch(() => props.clearData, () => {
  for(let i = 0; i < gridArr.length; i++) {
    gridArr[i].data = [];
  }
})
</script>

<template>
  <div class="waterfall-body">
    <!--    1-->
    <div class="column">
      <noteCard
          v-for="i in gridArr[0].data" :key="i.nid"
          :avatarUrl="i.avatarUrl"
          :username="i.username"
          :cover="i.cover"
          :likes_count="i.likes_count"
          :title="i.title"
          :cover_height="i.cover_height"
          :nid="i.nid"
          @click="toDetail(i.nid)"
      ></noteCard>
    </div>
    <!--    2-->
    <div class="column">
      <noteCard
          v-for="i in gridArr[1].data" :key="i.nid"
          :avatarUrl="i.avatarUrl"
          :username="i.username"
          :cover="i.cover"
          :likes_count="i.likes_count"
          :title="i.title"
          :cover_height="i.cover_height"
          :nid="i.nid"
          @click="toDetail(i.nid)"
      ></noteCard>
    </div>
    <!--    3-->
    <div class="column">
      <noteCard
          v-for="i in gridArr[2].data" :key="i.nid"
          :avatarUrl="i.avatarUrl"
          :username="i.username"
          :cover="i.cover"
          :likes_count="i.likes_count"
          :title="i.title"
          :cover_height="i.cover_height"
          :nid="i.nid"
          @click="toDetail(i.nid)"
      ></noteCard>
    </div>
    <!--    4-->
    <div class="column">
      <noteCard
          v-for="i in gridArr[3].data" :key="i.nid"
          :avatarUrl="i.avatarUrl"
          :username="i.username"
          :cover="i.cover"
          :likes_count="i.likes_count"
          :title="i.title"
          :cover_height="i.cover_height"
          :nid="i.nid"
          @click="toDetail(i.nid)"
      ></noteCard>
    </div>

  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}
.waterfall-body {
  width: 100%;
  height: 100%;
  display: flex;
}
.column {
  flex: 1;
  padding: 0 10px;
}
</style>