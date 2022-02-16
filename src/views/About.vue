<template>
	<div class="about">
		<h1>{{ id }}</h1>
		<span @click="tohello">to about</span>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// const id = '123131'
const $router = useRouter()
const $route = useRoute()

const tohello = () => {
	$router.push({ name: 'About', params: { id: '123131' } })
}
const id = computed(() => $route.params.id)
</script>
