<template>
    <el-button>{{ home }}</el-button>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { userListApi } from '@common/utils/src/api/user.ts'

onMounted(async () => {
    await userListApi({ take: 20, skip: 0 })
})

const home = 'this is home'
</script>

<style></style>
