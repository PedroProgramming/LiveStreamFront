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
      videoUrl: 'http://localhost:8080/hls/0180c9c213164e918393bbbecd24e479/index.m3u8',
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
