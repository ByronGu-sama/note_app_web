<script setup lang="ts">
import {ref} from "vue";

interface ICropperProps {
  img: string;
  info?: boolean;
  autoCrop?: boolean;
  autoCropHeight: number;
  autoCropWidth: number;
  fixed?: boolean;
  fixedNumber?: number[];
  centerBox?: boolean;
  showCropper: boolean;
}

const props = withDefaults(defineProps<ICropperProps>(), {
  info: () => false,
  autoCrop: () => true,
  fixed: () => true,
  fixedNumber: () => [1, 1],
  centerBox: () => true,
})
const emits = defineEmits(["rawBlob", "close"])
let cropper = ref<any>("")

const cancelDialog = () => {
  emits("close");
}

const submitDialog = () => {
  cropper.value.getCropBlob( (blob:any) => {
    emits("rawBlob", blob)
  });
  emits("close");
}
</script>

<template>
  <el-dialog
      :model-value="showCropper"
      :show-close="false"
      :close-on-click-modal="false"
      width="800">
    <div style="width: 765px; height: 500px">
      <vue-cropper
          ref="cropper"
          :img="props.img"
          :info="props.info"
          :auto-crop="props.autoCrop"
          :auto-crop-height="props.autoCropHeight"
          :auto-crop-width="props.autoCropWidth"
          :fixed="props.fixed"
          :fixed-number="props.fixedNumber"
          :center-box="props.centerBox"
      ></vue-cropper>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelDialog">取消</el-button>
        <el-button type="primary" @click="submitDialog">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>