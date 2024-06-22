<template>
    <el-dialog v-model="dialogVisible" destroy-on-close :title="title" width="500">
        <el-form :model="userForm" ref="userFormRef" :rules="rules" label-width="auto" class="user-form">
            <el-form-item label="帐号">
                <el-input :disabled="isEdit" v-model="userForm.account" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="userForm.password" />
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="userForm.nickname" />
            </el-form-item>
            <el-form-item label="级别">
                <el-select v-model="userForm.level" placeholder="Select">
                    <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { createUserApi, updateUserApi, User, UserForm, UserLevel } from '@common/utils/src/api/user.ts'
import { FormInstance, FormRules } from 'element-plus'

interface Props {
    user: User | null
}

const props = withDefaults(defineProps<Props>(), {
    user: null,
})
const dialogVisible = defineModel({ type: Boolean })
const emit = defineEmits(['success'])

const isEdit = computed(() => Boolean(props.user))
const title = computed(() => {
    return isEdit.value ? '编辑用户' : '新增用户'
})

const userFormRef = ref<FormInstance>()
const userForm = ref<UserForm>({
    account: '',
    nickname: '',
    password: '',
    level: UserLevel.USER,
})
watch(
    () => props.user,
    newValue => {
        if (newValue) {
            const { id, account, nickname, level } = newValue
            userForm.value = { id, account, nickname, level }
        }
    },
)
const rules = reactive<FormRules<UserForm>>({
    account: [
        { required: true, message: '请输入帐号', trigger: 'blur' },
        {
            min: 6,
            max: 16,
            message: '帐号长度限制为6到16个字符',
            trigger: 'blur',
        },
    ],
    nickname: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        {
            min: 2,
            max: 16,
            message: '昵称长度限制为2到16个字符',
            trigger: 'blur',
        },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
            min: 6,
            max: 16,
            message: '密码长度限制为8到16个字符',
            trigger: 'blur',
        },
    ],
    level: [{ required: true, message: '请选择用户等级', trigger: 'change' }],
})
const levelOptions = [
    {
        value: UserLevel.ADMIN,
        label: '管理员',
    },
    {
        value: UserLevel.USER,
        label: '普通用户',
    },
]

const handleClose = () => {
    dialogVisible.value = false
}
const submit = async () => {
    await userFormRef.value!.validate(async valid => {
        if (valid) {
            const request = isEdit.value ? updateUserApi : createUserApi
            await request(userForm.value)
            emit('success')
            handleClose()
        }
    })
}
</script>

<style scoped>
.user-form {
    padding: 0 36px;
}
</style>
