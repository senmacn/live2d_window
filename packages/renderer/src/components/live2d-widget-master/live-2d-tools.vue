<template>
  <div id="waifu-tool">
    <template
      v-for="[name, tool] in Object.entries(tools)"
      :key="name"
    >
      <div
        :id="`waifu-tool-${name}`"
        @click="tool.callback"
      >
        <img :src="tool.icon" />
      </div>
    </template>
  </div>
</template>

<script setup>
  import Model from './model.js';
  import fa_comment from '../../assets/icons/comment.svg';
  import fa_paper_plane from '../../assets/icons/paper-plane.svg';
  import fa_user_circle from '../../assets/icons/circle-user.svg';
  import fa_street_view from '../../assets/icons/street-view.svg';
  import fa_camera_retro from '../../assets/icons/camera-retro.svg';
  import fa_xmark from '../../assets/icons/xmark.svg';

  import showMessage from './message.js';

  const model = new Model({
    waifuPath: '../assets/json/waifu-tips.json',
    cdnPath: 'https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/',
  });

  const tools = {
    hitokoto: {
      icon: fa_comment,
      callback: () => null,
    },
    asteroids: {
      icon: fa_paper_plane,
      callback: () => {
        if (window.Asteroids) {
          if (!window.ASTEROIDSPLAYERS) window.ASTEROIDSPLAYERS = [];
          window.ASTEROIDSPLAYERS.push(new window.Asteroids());
        } else {
          const script = document.createElement('script');
          script.src = 'https://fastly.jsdelivr.net/gh/stevenjoezhaasteroids/asteroids.js';
          document.head.appendChild(script);
        }
      },
    },
    'switch-model': {
      icon: fa_user_circle,
      callback: () => null,
    },
    'switch-texture': {
      icon: fa_street_view,
      callback: () => null,
    },
    photo: {
      icon: fa_camera_retro,
      callback: () => {
        showMessage('照好了嘛，是不是很可爱呢？', 6000, 9);
        window.Live2D.captureName = 'photo.png';
        window.Live2D.captureFrame = true;
      },
    },
    quit: {
      icon: fa_xmark,
      callback: () => {
        localStorage.setItem('waifu-display', Date.now());
        showMessage('愿你有一天能与重要的人重逢。', 2000, 11);
        document.getElementById('waifu').style.bottom = '-500px';
        setTimeout(() => {
          document.getElementById('waifu').style.display = 'none';
          document.getElementById('waifu-toggle').classList.add('waifu-toggle-active');
        }, 3000);
      },
    },
  };

  tools['switch-model'].callback = () => model.loadOtherModel();
  tools['switch-texture'].callback = () => model.loadRandModel();
</script>

<style lang="less">
  #waifu-tool {
    display: flex;
    width: 50%;
    img {
      width: 15px;
    }
  }
</style>
