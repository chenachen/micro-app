<template>
    <div>
        <div>子应用页面一</div>
        <el-button @click="goTo">跳转</el-button>
    </div>
</template>

<script setup lang="ts">
import { useCustomRouterPush } from 'child-vue3/router'

const goTo = () => useCustomRouterPush('/home')
</script>
