<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <VideoCard v-for="video in videos" :key="video.id" :video="video" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import VideoCard from './VideoCard.vue'

const videos = ref([])

const isLoading = ref(true);

const fetchVideos = async () => {
  isLoading.value = true;
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/channel/videos/list');
    if (response.ok) {
      const data = await response.json();
      videos.value = data.videos;
    } else {
      console.error('Erro ao buscar vídeos:', response.status);
    }
  } catch (error) {
    console.error('Erro ao carregar vídeos:', error);
  } finally {
    isLoading.value = false;
  }
};


onMounted(() => {
  fetchVideos()
})

</script>
