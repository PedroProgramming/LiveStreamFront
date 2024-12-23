<template>
<div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
    <img :src="'http://127.0.0.1:8000' + video.thumbnail_url" alt="Thumbnail do vídeo" class="w-full h-48 object-cover rounded-md mb-4" />
    <h3 class="text-lg font-semibold mb-2">{{ video.title }}</h3>
    <p class="text-sm text-gray-500">{{ video.description }}</p>

    <p @click="$router.push({ name: 'video-detail', params: { identifier: video.identifier } })" class="bg-blue-500 py-3 px-4 text-white cursor-pointer">
      Assistir
    </p>
</div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  video: {
    type: Object,
    required: true
  }
})
</script>