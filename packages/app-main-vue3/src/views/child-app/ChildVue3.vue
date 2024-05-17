<template>
    <micro-app :name="name" :url="url" :baseroute="basePath" iframe></micro-app>
</template>

<script lang="ts" setup>
import { childAppConfig } from 'main-vue3/configs/app'

const { url, basePath, name } = childAppConfig.childVue3
</script>
