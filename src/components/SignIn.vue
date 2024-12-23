<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <form @submit.prevent="login" class="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 class="text-2xl font-semibold text-center mb-6">Entrar</h2>
        
        <!-- Campo de E-mail -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            id="email"
            v-model="form_login.email"
            class="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu e-mail"
            required
          />
        </div>
        
        <!-- Campo de Senha -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            id="password"
            v-model="form_login.password"
            class="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite sua senha"
            required
          />
        </div>
        
        <!-- Botão de Enviar -->
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Entrar
        </button>
        
        <!-- Link de Esqueci a Senha -->
        <div class="text-center mt-4">
          <a href="#" class="text-sm text-blue-500 hover:underline">Esqueceu a senha?</a>
        </div>
      </form>
    </div>
  </template>


<script>
import {auth_fetch} from "../auth/auth";
import router from "../router/index";
export default {
    name: "Sign-In",
    data() {
      return {
        form_login: {
          "email": "",
          "password": ""
        }
      }
    },
    methods: {
      async login(){
        const response = await auth_fetch("http://127.0.0.1:8000/api/v1/auth/login", {
          method: "POST",
          body: JSON.stringify(this.form_login)
        })

        if (response.response.access_token && response.response.refresh_token){
            localStorage.setItem("access_token", response.response.access_token)
            localStorage.setItem("refresh_token", response.response.refresh_token)

            router.push({"name": "home"})
        }
		}
	}
}
</script>