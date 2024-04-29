<template>
    <el-button type="primary" :icon="Refresh" v-bind="$attrs">
        {{ text }}
    </el-button>
</template>

<script lang="ts" setup>
import { Refresh } from '@element-plus/icons-vue'
import { ElButton } from 'element-plus'

withDefaults(
    defineProps<{
        text: string
        icon: typeof Refresh
    }>(),
    {
        text: '刷新',
        icon: Refresh,
    },
)
</script>
