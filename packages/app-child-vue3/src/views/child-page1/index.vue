<template>
    <div>
        <div>子应用页面一</div>
        <el-button @click="goTo">跳转</el-button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const goTo = () => router.push('/home')
</script>
