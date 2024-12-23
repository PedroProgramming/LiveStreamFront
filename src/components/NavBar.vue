<template>
  <UploadVideoModal :isOpen="isModalOpen" @close="closeModal" />
  <nav class="bg-gray-800 text-white shadow-lg">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <div class="text-2xl font-bold">
        <a href="/" class="hover:text-gray-300">YouVideos</a>
      </div>
      <ul class="flex space-x-6">
        <li v-if="!isAuthenticated">
          <RouterLink to="/sign-in"
            class="text-white hover:text-gray-300 transition-colors duration-300"
          >
            Entrar
          </RouterLink>
        </li>
        <li v-if="!isAuthenticated">
          <RouterLink to="/sign-up"
            href=""
            class="text-white hover:text-gray-300 transition-colors duration-300"
          >
            Cadastrar
          </RouterLink>
        </li>
        <li v-if="isAuthenticated">
          <p
            @click="verify_channel"
            class="text-white hover:text-gray-300 transition-colors duration-300"
          >
            Meu Canal
        </p>
        </li>
        <li v-if="isAuthenticated">
          <p @click="openModal"
            class="text-white hover:text-gray-300 transition-colors duration-300 px-2 rounded-lg bg-blue-500 cursor-pointer"
          >
            Enviar Vídeo
          </p>
        </li>
        <li v-if="isAuthenticated">
          <RouterLink to="/"
            href=""
            class="text-white hover:text-gray-300 transition-colors duration-300"
          >
            Nova Transmissão
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import UploadVideoModal from './UploadVideoModal.vue';
import { auth_fetch } from '../auth/auth';
import router from "../router/index";

export default {
  name: "NavBar",
  components: {
    UploadVideoModal,
  },
  data() {
    return {
      isAuthenticated: !!localStorage.getItem("access_token"),
      isModalOpen: false,
    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    
    async verify_channel(){
      const response = await auth_fetch("http://127.0.0.1:8000/api/v1/channel/verify", {
        method: "GET",
      });
      console.log(response)
      if(response.status == 200){
        router.push({"name": "channel", params: { channel_name: response.response.channel_name}})
      }
    }
  },
}
</script>