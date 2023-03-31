<template>
  <div id="waifu">
    <live-2d-tips></live-2d-tips>
    <canvas
      id="live2d"
      width="400"
      height="400"
    ></canvas>
    <live-2d-tools></live-2d-tools>
    <live-2d-toggle></live-2d-toggle>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import Live2dTips from './live-2d-tips.vue';
  import Live2dTools from './live-2d-tools.vue';
  import Live2dToggle from './live-2d-toggle.vue';
  import initWidget from '.';
  import Model from './model';
  import { registerEventListener } from './utils';
  import waifuTips from '../../assets/json/waifu-tips.json';

  // live2d_path 参数建议使用绝对路径
  //const live2d_path = "/live2d-widget/";
  const WAIFU_PATH = '';

  // 配置选项的具体用法见 README.md
  onMounted(() => {
    initWidget();
    const model = new Model({
      waifuPath: WAIFU_PATH,
      cdnPath: 'https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/',
    });
    let modelId = localStorage.getItem('modelId') || 1,
      modelTexturesId = localStorage.getItem('modelTexturesId') || 53;
    model.loadModel(modelId, modelTexturesId);
    registerEventListener(waifuTips);
  });
</script>

<style lang="less"></style>
