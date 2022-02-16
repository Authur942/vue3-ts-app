<template>
	<div>hello</div>
	<div @click="tohello">toHello</div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
// const id = '123131'
const $router = useRouter()

const tohello = () => {
	$router.push({ name: 'hello', params: { id: '12313' } })
}
</script>

<style lang="scss" scoped></style>
