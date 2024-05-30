<template>
    <el-config-provider size="small">
        <router-view />
    </el-config-provider>
</template>

<script setup lang="ts">
import { useRequest } from '@common/utils'

useRequest({
    url: '/api/user/list',
    data: {
        skip: 0,
        take: 20,
    },
    method: 'get',
})
</script>

<style scoped></style>
