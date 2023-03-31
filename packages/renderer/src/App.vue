<template>
  <div class="wrapper">
    <div class="navbar"></div>
    <div class="main-stage">
      <live-2d></live-2d>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Live2d from './components/live2d-widget-master/live-2d.vue';
</script>

<style lang="less">
.wrapper {
  display: flex;
  height: 100vh;
}
</style>
