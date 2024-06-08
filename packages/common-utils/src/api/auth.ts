import { CustomConfig, useGetRequest, usePostRequest } from './request'

interface GetCaptchaParams {
    width: number
    height: number
}

interface GetCaptchaRes {
    img: string
    id: string
}

export function getCaptchaApi(params: GetCaptchaParams, config: CustomConfig) {
    return useGetRequest<GetCaptchaRes, GetCaptchaParams>('/auth/captcha', params, config)
}

interface LoginData {
    account: string
    password: string
    captchaId: string
    verifyCode: string
}

interface LoginRes {
    accessToken: string
    refreshToken: string
}

export function loginApi(data: LoginData) {
    return usePostRequest<LoginRes>('/auth/login', JSON.stringify(data))
}
