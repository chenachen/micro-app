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
                @select="handleSelect"
            >
                <template v-for="menu in menuList" :key="menu.path">
                    <el-menu-item v-if="!menu.children?.length" :index="menu.path">{{ menu.label }}</el-menu-item>
                    <el-sub-menu v-else :index="menu.path">
                        <template #title>{{ menu.label }}</template>
                        <el-menu-item v-for="childrenMenu in menu.children" :key="childrenMenu.path" :index="childrenMenu.path">
                            {{ childrenMenu.label }}
                        </el-menu-item>
                    </el-sub-menu>
                </template>
            </el-menu>
        </el-header>
        <el-main class="layout-main">
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import microApp from '@micro-zoe/micro-app'
import { routeToMenu } from '@common/utils'
import { routes } from '../router'
import { RouteRecordRaw, useRoute } from 'vue-router'
import { childAppConfig } from '@common/constant'
import { MenuType } from '@common/utils/src/route-to-menu'

const route = useRoute()
const defaultActive = route.path

const menuList = ref<MenuType[]>(routeToMenu(routes[0].children!))
const handleSelect = () => {}

Object.values(childAppConfig).forEach(item => {
    microApp.addDataListener(item.name, function handler(data: Record<string, unknown>) {
        const { routes } = data
        if (routes) {
            const childMenu = routeToMenu((routes as RouteRecordRaw[])[0].children!, item.basePath)
            menuList.value.forEach(menu => {
                if (menu.path === item.basePath) {
                    menu.children = childMenu
                }
            })

            microApp.removeDataListener(item.name, handler)
        }
    })
})
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
    }
}
</style>
