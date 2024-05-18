<template>
    <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
    window.console.log('mounted')
})
</script>

<style scoped></style>
