<template>
    <div class="p-8 bg-gray-50 min-h-screen">
        <SearchBar :username="username"/>
        <img style="border-radius: 20%;" width="100px" height="100px" v-if="photo" :src="'http://127.0.0.1:8000' + photo" alt="Foto de perfil" />
        <p v-else>Foto não disponível</p>
        <h1 class="text-3xl font-semibold text-center mb-6">Explorar Vídeos</h1>
        
        <VideoList />

        <br>
        <br>

        <h1 class="text-3xl font-semibold text-center mb-6">Explorar Transmissões ao Vivo</h1>
        <StreamList/>
 
    </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue'
import VideoList from '../components/VideoList.vue'
import StreamList from '../components/StreamList.vue'
import VideoPlayerStream from '../components/VideoPlayerStream.vue'

import {auth_fetch} from "../auth/auth";

export default {
name: "HomeView",
data(){
    return {
        username: "",
        photo: ""
    }
},
components:{
    SearchBar,
    VideoList,
    StreamList,
    VideoPlayerStream,
},
created() {
    this.fetchUserProfile();
},
methods: {
    async fetchUserProfile(){
        try{
            const response = await auth_fetch("http://127.0.0.1:8000/api/v1/user/details",{
                method: "GET",
            });
            console.log(response)
            if(response.status == 200){
                this.username = response.response.username
                this.photo = response.response.profile_picture_url
            }
        } catch (error) {
            console.error("Erro ao carregar o perfil do usuário:", error);
        }
    },
}
}
</script>

  