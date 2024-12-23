<template>
<div class="p-8 bg-gray-50 min-h-screen">
    <!-- Banner do Canal -->
    <div class="bg-blue-500 text-white text-center p-6 rounded-lg shadow-md">
    <h1 class="text-4xl font-bold">{{ channel.channel_name }}</h1>
    <p class="text-lg mt-2">{{ channel.description }}</p>
    <p>Subscribers: {{ channel.subscribers_count }}</p>
    </div>


    <!-- Botão de Gerenciamento -->
    <div class="flex justify-end mt-4">
    <button 
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg">
        Gerenciar Canal
    </button>
    </div>

    <!-- Lista de Vídeos -->
    <div class="mt-8">
    <h2 class="text-2xl font-semibold mb-4">Vídeos</h2>
    <div v-if="videos.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="video in videos" :key="video.id" class="bg-white shadow rounded-lg overflow-hidden">
            <img :src="'http://127.0.0.1:8000' + video.thumbnail_url" alt="Thumbnail do vídeo" class="w-full h-40 object-cover" />
            <div class="p-4">
                <h3 class="text-lg font-semibold">{{ video.title }}</h3>
                <p class="text-sm text-gray-600 mt-2">{{ video.description }}</p>
            </div>
            <a @click="$router.push({ name: 'video-detail', params: { identifier: video.identifier } })">Assistir</a>
        </div>
    </div>
    <p v-else class="text-gray-500">Nenhum vídeo encontrado.</p>
    </div>
</div>
</template>

<script>
import { auth_fetch } from '../auth/auth';
export default {
name: "ChannelPage",
data() {
    return {
        channel: {},
        videos: []
    };
},
async created() {
    const channel_name = this.$route.params.channel_name;
    try {
      const response = await auth_fetch(`http://127.0.0.1:8000/api/v1/channel/details/${channel_name}`, {
        method: "GET",
      });
      console.log(response)
      if (response.status === 200) {
        this.channel = response.response;
      } else {
        console.error("Erro ao buscar detalhes do canal:", response.response.error);
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
    }


    try {
      const videosResponse = await auth_fetch(`http://127.0.0.1:8000/api/v1/channel/videos/${channel_name}`, {
        method: "GET",
      });
      console.log(videosResponse.response.videos)
      if (videosResponse.status === 200) {
        this.videos = videosResponse.response.videos;
      } else {
        console.error("Erro ao buscar videos do canal:", videosResponse.response.error);
      }
    } catch (error) {
      console.error("Erro inesperado:", error);
    }
},

};
</script>

<style scoped>
</style>
