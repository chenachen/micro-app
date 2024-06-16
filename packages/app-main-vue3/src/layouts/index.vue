<template>
    <el-container class="layout-container">
        <el-header height="48px" class="layout-header">
            <el-menu
                :default-active="defaultActive"
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
            >
                <template v-for="menu in menuList" :key="menu.path">
                    <el-menu-item v-if="!menu.children?.length" :index="menu.path">{{ menu.label }}</el-menu-item>
                    <el-sub-menu v-else :index="menu.path">
                        <template #title>{{ menu.label }}</template>
                        <el-menu-item
                            v-for="childrenMenu in menu.children"
                            :key="childrenMenu.path"
                            :index="childrenMenu.path"
                        >
                            {{ childrenMenu.label }}
                        </el-menu-item>
                    </el-sub-menu>
                </template>
            </el-menu>
        </el-header>
        <el-main class="layout-main">
            <el-card class="main-wrapper">
                <router-view></router-view>
            </el-card>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { computed, readonly } from 'vue'
import { useRoute } from 'vue-router'
import { MenuList } from './menu-list.ts'

const route = useRoute()
const defaultActive = computed(() => route.path)

const menuList = readonly(MenuList)
</script>

<style lang="less">
.layout-container {
    width: 100vw;
    height: 100vh;

    .layout-header {
        padding: 0;
    }

    .layout-main {
        flex: 1;
        min-height: 0;
        background: #f2f3f5;
        padding: 24px 36px;
        overflow: hidden;

        .main-wrapper {
            background: #ffffff;
            height: 100%;
            border-radius: 8px;
        }
    }
}
</style>
