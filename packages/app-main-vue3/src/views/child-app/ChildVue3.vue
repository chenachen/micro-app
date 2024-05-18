<template>
    <micro-app :name="name" :url="url" :baseroute="basePath" iframe @mounted="onChildAppMounted"></micro-app>
</template>

<script lang="ts" setup>
import { AppType, childAppConfig } from '@common/constant'
import { useRoute } from 'vue-router'
import { watchEffect, ref } from 'vue'
import _microApp from '@micro-zoe/micro-app'

const route = useRoute()

// child app config
const { url, basePath, name } = childAppConfig.childVue3

const childAppMounted = ref(false)
const onChildAppMounted = () => {
    childAppMounted.value = true
}

watchEffect(() => {
    if (childAppMounted.value) {
        _microApp.router.push({ name: AppType.CHILD_VUE3, path: route.fullPath })
    }
})
</script>
