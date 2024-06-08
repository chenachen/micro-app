<template>
    <div class="login-container">
        <el-card class="form-container">
            <div class="form-container__title">登录</div>
            <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" style="max-width: 600px">
                <el-form-item prop="account">
                    <el-input
                        :prefix-icon="User"
                        class="form-container__form-item"
                        v-model="form.account"
                        @keyup.enter="login"
                        placeholder="请输入帐号"
                    />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        :prefix-icon="Lock"
                        class="form-container__form-item"
                        type="password"
                        @keyup.enter="login"
                        v-model="form.password"
                        placeholder="请输入密码"
                    />
                </el-form-item>
                <el-form-item prop="verifyCode">
                    <div class="form-container__captcha">
                        <el-input
                            :prefix-icon="Key"
                            class="form-container__form-item form-container__captcha-input"
                            v-model="form.verifyCode"
                            @keyup.enter="login"
                            placeholder="请输入验证码"
                        />
                        <el-image :src="captchaImg" class="form-container__captcha-img" @click="debouncedGetCaptcha" />
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button
                        class="form-container__form-item form-container__login-button"
                        type="primary"
                        ref="loginBtnRef"
                        @click="login"
                        >登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { User, Lock, Key } from '@element-plus/icons-vue'
import { getCaptchaApi, loginApi } from '@common/utils'
import { useDebounceFn } from '@vueuse/core'
import { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { mainRoutes } from '@common/constant'

const router = useRouter()

const formRef = ref<FormInstance>()
const loginBtnRef = ref()
const form = reactive({
    account: '',
    password: '',
    verifyCode: '',
    captchaId: '',
})
const rules = reactive<FormRules<typeof form>>({
    account: [{ required: true, message: '请输入帐号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    verifyCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
})
const captchaImg = ref('')

const getCaptcha = async () => {
    const { img, id } = await getCaptchaApi(
        { width: 100, height: 36 },
        {
            loadingTarget: loginBtnRef.value.$el,
        },
    )
    captchaImg.value = img
    form.captchaId = id
}
const debouncedGetCaptcha = useDebounceFn(() => {
    getCaptcha()
}, 500)

const login = () => {
    formRef.value?.validate(async valid => {
        if (valid) {
            const { accessToken, refreshToken } = await loginApi(form)
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)

            router.push({
                name: mainRoutes.home.name,
            })
        }
    })
}

onMounted(() => {
    getCaptcha()
})
</script>

<style scoped lang="less">
.login-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ecf5ff;

    .form-container {
        transform: translateY(-100px);
        width: 450px;
        padding: 12px 32px;
        box-sizing: border-box;

        &__title {
            height: 64px;
            line-height: 64px;
            font-size: 24px;
            font-weight: bold;
            text-align: center;
        }

        &__form-item {
            height: 36px;
        }

        &__captcha {
            width: 100%;
            display: flex;

            &-img {
                width: 100px;
                height: 36px;
                transform: translateY(-3px);
                cursor: pointer;
            }

            &-input {
                flex: 1;
                min-width: 0;
            }
        }

        &__login-button {
            width: 100%;
        }
    }
}
</style>
