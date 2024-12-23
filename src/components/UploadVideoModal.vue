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
    videoTitle: "", // Título do vídeo
    videoDescription: "", // Descrição do vídeo
    videoFile: null, // Arquivo de vídeo carregado
    };
},
methods: {
    closeModal() {
    this.$emit("close"); // Emite um evento para o componente pai fechar o modal
    },
    handleFileUpload(event) {
    this.videoFile = event.target.files[0]; // Salva o arquivo selecionado
    },
    submitVideo() {
    if (!this.videoFile) {
        alert("Por favor, selecione um arquivo de vídeo.");
        return;
    }

    // Simula envio de dados (substituir com uma API real)
    console.log("Enviando vídeo:");
    console.log("Título:", this.videoTitle);
    console.log("Descrição:", this.videoDescription);
    console.log("Arquivo:", this.videoFile);

    // Reset dos campos após envio
    this.videoTitle = "";
    this.videoDescription = "";
    this.videoFile = null;

    alert("Vídeo enviado com sucesso!");

    // Fecha o modal
    this.closeModal();
    },
},
};
</script>

<style scoped>
/* Adiciona estilos personalizados para o modal */
</style>
