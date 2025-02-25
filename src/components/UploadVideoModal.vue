<template>
<div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
    <!-- Header do Modal -->
    <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Enviar Vídeo</h2>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
        ✖
        </button>
    </div>

    <!-- Formulário de Envio -->
    <form @submit.prevent="submitVideo">
        <div class="mb-4">
        <label for="title" class="block text-sm font-semibold text-gray-700">Título do Vídeo</label>
        <input
            v-model="videoTitle"
            id="title"
            type="text"
            required
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Digite o título do vídeo"
        />
        </div>

        <div class="mb-4">
        <label for="description" class="block text-sm font-semibold text-gray-700">Descrição</label>
        <textarea
            v-model="videoDescription"
            id="description"
            rows="4"
            required
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Digite a descrição do vídeo"
        ></textarea>
        </div>

        <div class="mb-4">
        <label for="file" class="block text-sm font-semibold text-gray-700">Arquivo de Vídeo</label>
        <input
            @change="handleFileUpload"
            id="file"
            type="file"
            accept="video/*"
            required
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-gray-700 file:bg-gray-50 hover:file:bg-gray-100"
        />
        </div>

        <!-- Botões de Ação -->
        <div class="flex justify-end">
        <button
            type="button"
            @click="closeModal"
            class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-md mr-2"
        >
            Cancelar
        </button>
        <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
            Enviar
        </button>
        </div>
    </form>
    </div>
</div>
</template>

<script>
import { auth_fetch } from '../auth/auth';
export default {
name: "UploadVideoModal",
props: {
    isOpen: {
    type: Boolean,
    required: true, // Define que o estado de abertura é controlado externamente
    },
},
data() {
    return {
        videoTitle: "",
        videoDescription: "",
        videoFile: null
    };
},
methods: {
    closeModal() {
        this.$emit("close");
    },
    handleFileUpload(event) {
        this.videoFile = event.target.files[0];
    },
    async submitVideo() {
        if (!this.videoFile) {
            alert("Por favor, selecione um arquivo de vídeo.");
            return;
        }

        const formData = new FormData();
        formData.append("video_data", JSON.stringify({
            title: this.videoTitle,
            description: this.videoDescription
        }));
        formData.append("video_file", this.videoFile);
        
       

        try {
            const response = await auth_fetch("http://127.0.0.1:8000/api/v1/channel/videos/upload", {
                method: "POST",
                body: formData
            });
            if (response["success"]) throw new Error("Erro ao enviar vídeo");
            alert("Vídeo enviado com sucesso!");
        } catch (error) {
            alert(error.message);
        }

        this.videoTitle = "";
        this.videoDescription = "";
        this.videoFile = null;
        this.closeModal();
    }
}
}
</script>

<style scoped>
/* Adiciona estilos personalizados para o modal */
</style>
