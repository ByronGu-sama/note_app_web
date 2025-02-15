<script setup lang="ts">
import axios from "axios";
import requestList from "../../requestAPI/requestList.ts";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";

const emits = defineEmits(["verified"]);

const state = reactive({
  captcha: null,
  popupId: "",
});

const captchaButton = ref<HTMLElement | null>(null);

onBeforeUnmount(() => {
  state.captcha = null;
  document.getElementById("aliyunCaptcha-mask")?.remove();
  document.getElementById("aliyunCaptcha-window-popup")?.remove();
});

onMounted(async () => {
  captchaButton.value = document.getElementById("captcha-button");
  if (captchaButton.value) {
    window.initAliyunCaptcha(captchaOptions);
  }
});

const getInstance = (instance: any) => {
  state.captcha = instance;
};

// 验证码校验
const captchaVerifyCallback = async (captchaVerifyParam: any) => {
  try {
    const param = {
      captchaVerifyParam: captchaVerifyParam,
      sceneId: captchaOptions.SceneId,
    }
    let result = await axios.post(`${requestList.VERIFY_CAPTCHA}`, param);
    return {
      captchaResult: Boolean(result.status)
    };
  } catch (error) {
    return {
      captchaResult: false
    };
  }
};

// 校验成功回调函数
const onBizResultCallback = (bizResult: boolean) => {
  if (bizResult) {
    emits("verified");
  }
};

const popup = (popupId: string) => {
  state.popupId = popupId;
  captchaButton.value?.click();
};

const captchaOptions = {
  SceneId: '8wchsj1b',
  prefix: '1b2nft',
  mode: 'popup',
  element: '#captcha-element',
  button: '#captcha-button',
  captchaVerifyCallback,
  onBizResultCallback,
  getInstance,
  slideStyle: {
    width: 360,
    height: 40,
  },
  language: 'cn',
  region: 'cn'
}

defineExpose({
  popup
});
</script>

<template>
  <div class="verify-btn">
    <div ref="captchaButton" id="captcha-button">
      <p>
        <slot></slot>
      </p>
    </div>
    <div id="captcha-element"></div>
  </div>
</template>

<style scoped>
.verify-btn {
  width: 100%;
  height: 100%;
}
</style>