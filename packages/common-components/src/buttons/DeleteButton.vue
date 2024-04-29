<template>
    <el-button type="danger" :icon="icon" v-bind="$attrs">
        {{ text }}
    </el-button>
</template>

<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'

withDefaults(
    defineProps<{
        text: string
        icon: typeof Delete
    }>(),
    {
        text: '删除',
        icon: Delete,
    },
)
</script>
