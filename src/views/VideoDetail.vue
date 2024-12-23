<template>
    <div class="video-detail">w  
      <div v-if="video">
        <video id="player_video" ref="videoPlayer" controls class="w-full h-auto">
          <source :src="videoUrl" type="video/mp4" />
          Seu navegador não suporta o vídeo.
        </video>
  
        <h1 class="text-2xl font-bold mt-4">{{ video.title }}</h1>
        <p class="mt-2">{{ video.description }}</p>
        
        <div class="quality-selector mt-4">
          <label for="quality">Escolha a qualidade:</label>
          <select id="quality" v-model="selectedQuality" @change="fetchVideoUrl">
            <option selected value="1080">1080p</option>
            <option value="720">720p</option>
            <option value="480">480p</option>
            <option value="360">360p</option>
            <option value="240">240p</option>
          </select>
        </div>
        
        <div class="mt-4 flex items-center gap-4">
          <span>Views: {{ video.views }}</span>
          <span>Likes: {{ video.likes }}</span>
          <span>Dislikes: {{ video.dislikes }}</span>
        </div>
      </div>
  
      <div v-else>
        <p>Loading video details...</p> 
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, nextTick } from "vue";
  import { useRoute } from "vue-router";
  import { auth_fetch } from "../auth/auth";
  export default {
    name: "VideoDetail",
    setup() {
      const route = useRoute();
      const video = ref(null);
      const selectedQuality = ref("1080");
      const videoUrl = ref("");
      const videoPlayer = ref(null);

      // Função para buscar as informações do vídeo
      const fetchVideoDetails = async () => {
        const response = await auth_fetch(
          `http://127.0.0.1:8000/api/v1/channel/videos/detail/${route.params.identifier}`
        );
  
        if (response.status === 200) {
          video.value = response.response;
          fetchVideoUrl();
        } else {
          console.error("Failed to load video details:", response);
        }
      };
  
      const fetchVideoUrl = async () => {
        if (!video.value) return;  
        console.log(selectedQuality.value)
        videoUrl.value = `http://127.0.0.1:8000/media/videos/processed/${route.params.identifier}/${selectedQuality.value}p/${route.params.identifier}_${selectedQuality.value}p.mp4`;
        nextTick(() => {
        if (videoPlayer.value) {
          videoPlayer.value.src = videoUrl.value; 
          console.log("2")
          videoPlayer.value.load(); 
            } else {
                console.log("1")
            }
        });
        };
  
      // Chama ao montar o componente
      onMounted(() => {
        fetchVideoDetails();
      });
  
      return {
        video,
        selectedQuality,
        videoUrl,
        fetchVideoUrl,
      };
    },
  };
  </script>
  
  <style scoped>
  .video-detail {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  .quality-selector {
    margin-top: 20px;
  }
  </style>
  