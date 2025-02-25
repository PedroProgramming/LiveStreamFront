<template>
    <div class="w-1/2">
        <video ref="videoPlayer" autoplay controls class="w-full h-auto"></video>
    </div>
</template>



<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

export default {
  name: "VideoPlayer",
  setup() {
    const route = useRoute();
    const videoPlayer = ref(null);
    const videoUrl = ref(`http://localhost:8080/hls/${route.params.identifier}/480p/480p.m3u8`);


    onMounted(() => {
      if (Hls.isSupported() && videoPlayer.value) {
        const hls = new Hls();
        
        hls.loadSource(videoUrl.value);
        hls.attachMedia(videoPlayer.value);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("Manifesto carregado com sucesso!");
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.error("Erro fatal do HLS:", data.levels);
          }
        });

        new Plyr(videoPlayer.value, {
          controls: ["play", "progress", "current-time", "mute", "volume", "fullscreen"],
          hls: {
        provider: Hls,
        autoplay: true
    }
        });

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoPlayer.value.play();
        });

      } else if (videoPlayer.value.canPlayType("application/vnd.apple.mpegurl")) {
        videoPlayer.value.src = videoUrl.value;
      } else {
        console.error("HLS não é suportado neste navegador.");
      }
    });

    return {
      videoPlayer,
    };
  },
};

</script>

<style>
@import "plyr/dist/plyr.css";
</style>