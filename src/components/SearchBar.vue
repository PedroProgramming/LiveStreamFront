<template>
	<div class="flex justify-between mb-8">
		<h1 v-if="username" class="text-3xl">Olá, <strong>{{ username }}</strong></h1>
		<input
		v-model="query"
		@input="onSearch"
		type="text"
		class="w-80 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
		placeholder="Pesquise por vídeos..."
		/>
	</div>
</template>

<script>
export default {
	name: "SearchBar",
	props: {
		username: {
			type: String,
			required: false
		}
	}
}
</script>