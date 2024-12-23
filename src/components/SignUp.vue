<template>
	<div class="flex justify-center items-center min-h-screen bg-gray-100">
		<form @submit.prevent="register" class="bg-white p-8 rounded-lg shadow-lg w-80">
			<h2 class="text-2xl font-semibold text-center mb-6">Cadastrar</h2>

			<!-- Campo de Nome -->
			<div class="mb-4">
				<label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
				<input type="text" v-model="form_register.username" id="name"
						class="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Digite seu nome" required />
			</div>

			<!-- Campo de E-mail -->
			<div class="mb-4">
				<label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
				<input type="email" v-model="form_register.email" id="email"
						class="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Digite seu e-mail" required />
			</div>

			<!-- Campo de Senha -->
			<div class="mb-4">
				<label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
				<input type="password" v-model="form_register.password" id="password"
						class="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Digite sua senha" required />
			</div>

			<!-- Campo de Confirmação de Senha -->
			<div class="mb-6">
				<label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar Senha</label>
				<input type="password" v-model="form_register.confirm_password" id="confirmPassword"
						class="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Confirme sua senha" required />
			</div>

			<!-- Botão de Enviar -->
			<button type="submit"
				class="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
				Cadastrar
			</button>
		</form>
	</div>
</template>


<script>
import {auth_fetch} from "../auth/auth";
import router from "../router/index";
export default {
    name: "Sign-Up",
	data(){
		return {
			form_register: {
				"username": "",
				"email": "",
				"password": "",
				"confirm_password": ""
			}
		}
	},
	methods: {
		async register(){
			const response = await auth_fetch("http://127.0.0.1:8000/api/v1/auth/register", {
				method: "POST",
				body: JSON.stringify(this.form_register)
			})
			if(response.status == 201){
				router.push({"name": "sign-in"})
			}
		}
	}
}
</script>