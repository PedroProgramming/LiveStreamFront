<template>
  <div>
      <video ref="video" width="100%" controls>
      <source v-if="hlsSource" :src="hlsSource" type="application/x-mpegURL" />
      Seu navegador não suporta o vídeo HLS.
      </video>
  </div>
  </template>
  
  <script>
  import Hls from 'hls.js';
  
  export default {
    data() {
      return {
        videoUrl: 'http://localhost:8080/hls/2090b1c2c49745f6a01f98dbb07684c8/1080p/1080p.m3u8',
      };
    },
    mounted() {
      if (Hls.isSupported()) {
        const video = this.$refs.video;
        const hls = new Hls();
        hls.loadSource(this.videoUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          console.log('Manifest loaded');
        });
      } else {
        console.error('HLS is not supported in this browser');
      }
    },
  };
  
  </script>