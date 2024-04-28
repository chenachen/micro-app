<template>
    <el-button type="primary" v-bind="$attrs">
        {{ text }}
    </el-button>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'

withDefaults(
    defineProps<{
        text: string
    }>(),
    {
        text: '刷新',
    },
)
</script>
