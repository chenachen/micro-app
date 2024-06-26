<template>
    <div class="user-container">
        <div class="filter-bar">
            <el-button :icon="Refresh" @click="loadTableData">刷新</el-button>
            <el-button :icon="Plus" type="primary" @click="createUser">创建</el-button>
            <el-input v-model="filterData.searchText" :placeholder="placeholder" class="filter-bar__search-input">
                <template #prepend>
                    <el-select
                        v-model="filterData.searchType"
                        placeholder="Select"
                        class="filter-bar__search-input-select"
                    >
                        <el-option
                            v-for="item in SearchTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </template>
                <template #append>
                    <el-button :icon="Search" @click="loadTableData" />
                </template>
            </el-input>
        </div>
        <el-table :data="tableData" border class="user-table">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="account" label="帐号" />
            <el-table-column prop="nickname" label="昵称" />
            <el-table-column prop="level" label="级别" />
            <el-table-column prop="role" label="角色">
                <template #default="{ row }">{{ row.role?.name ?? '-' }}</template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间">
                <template #default="{ row }">
                    {{ formatDate(row.createAt) }}
                </template>
            </el-table-column>
            <el-table-column prop="nickname" label="Address">
                <template #default="{ row }">
                    <el-space :size="8">
                        <el-link :underline="false" type="primary" @click="updateUser(row)">编辑</el-link>
                        <el-link :underline="false" type="primary" @click="deleteUser(row)">删除</el-link>
                    </el-space>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :total="total" layout="prev, pager, next" />
    </div>
    <AddOrUpdateUser v-model="dialogVisible" :user="currUser" @success="loadTableData" />
</template>

<script lang="ts" setup>
import { Refresh, Plus, Search } from '@element-plus/icons-vue'
import { computed, onMounted, reactive, ref } from 'vue'
import { deleteUserApi, getUserListApi, type User } from '@common/utils/src/api/user.ts'
import { BaseListParams } from '@common/utils/src/api/types/query.ts'
import dayjs from 'dayjs'
import AddOrUpdateUser from './components/AddOrUpdateUser.vue'

const SearchType = {
    id: 'id',
    account: 'account',
    nickname: 'nickname',
}
const SearchTypeOptions = [
    {
        value: SearchType.id,
        label: 'ID',
    },
    {
        value: SearchType.account,
        label: '帐号',
    },
    {
        value: SearchType.nickname,
        label: '昵称',
    },
]
const filterData = reactive<BaseListParams>({
    searchType: SearchType.id,
    searchText: '',
    skip: 0,
    take: 20,
})
const placeholder = computed(() => {
    const option = SearchTypeOptions.find(item => item.value === filterData.searchType)

    return option!.value === SearchType.id ? '请输入ID' : `请输入${option!.label}, 支持模糊搜索`
})

const tableData = ref<User[]>([])
const total = ref(0)
const loadTableData = async () => {
    const { list, total: _total } = await getUserListApi(filterData)
    tableData.value = list
    total.value = _total
}
const formatDate = (date: string) => {
    return dayjs(date).format('YYYY-MM-DD')
}

const dialogVisible = ref(false)
const currUser = ref<User | null>(null)
const updateUser = (user: User) => {
    currUser.value = user
    dialogVisible.value = true
}
const createUser = () => {
    currUser.value = null
    dialogVisible.value = true
}
const deleteUser = async (user: User) => {
    const { id } = user
    await deleteUserApi({ id })
    await loadTableData()
}

onMounted(() => {
    loadTableData()
})
</script>

<style lang="less" scoped>
.user-container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .filter-bar {
        &__search-input {
            width: 320px;
            margin-left: 12px;

            &-select {
                width: 80px;
            }
        }
    }

    .user-table {
        margin-top: 16px;
        width: 100%;
        flex: 1;
        min-height: 0;
    }
}
</style>
