<template>
    <micro-app :name="name" :url="url" :baseroute="basePath" iframe></micro-app>
</template>

<script lang="ts" setup>
import { childAppConfig } from '@common/constant'

const { url, basePath, name } = childAppConfig.childVue3
</script>
