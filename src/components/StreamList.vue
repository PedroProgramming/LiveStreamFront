<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <StreamCard v-for="live in lives" :key="live.id" :live="live" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import StreamCard from './StreamCard.vue'

const lives = ref([])

const isLoading = ref(true);

const fetchLives = async () => {
  isLoading.value = true;
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/live/list');
    if (response.ok) {
      const data = await response.json();
      lives.value = data.lives;
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
fetchLives()
})

</script>
