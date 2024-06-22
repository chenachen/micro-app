import { createFetch, useFetch } from '@vueuse/core'
import type { AfterFetchContext, BeforeFetchContext, UseFetchOptions, OnFetchErrorContext } from '@vueuse/core'
import { WHITE_LIST } from './white-list.ts'
import { stringify } from 'qs'
import { watchEffect } from 'vue'
import { useLoading } from '../../hooks/loading.ts'
import { ErrorCode } from '../types/error-code.ts'
import { Router } from 'vue-router'
import { mainRoutes } from '@common/constant'
import microApp from '@micro-zoe/micro-app'

export interface CustomConfig extends UseFetchOptions {
    loadingTarget?: string | HTMLElement
    showErrMsg?: boolean
    showSuccessMsg?: boolean
    nativeResponse?: boolean
}

export interface RequestParams {
    url: string
    data?: BodyInit | null | undefined
    method?: 'get' | 'post'
    options?: RequestInit
}

const GLOBAL_PREFIX = '/api'

class BaseFetch {
    private readonly baseFetch: typeof useFetch
    private readonly urlMap: Map<string, BeforeFetchContext>

    constructor() {
        this.baseFetch = createFetch({
            baseUrl: GLOBAL_PREFIX,
            options: {
                beforeFetch: this.beforeFetch.bind(this),
                afterFetch: this.afterFetch.bind(this),
                onFetchError: this.onFetchError.bind(this),
                timeout: 30000,
            },
            fetchOptions: {
                mode: 'cors',
            },
        })

        this.urlMap = new Map()
    }

    private beforeFetch(ctx: BeforeFetchContext) {
        const { url, options, cancel } = ctx

        const [_url] = url.split('?')

        if (this.urlMap.has(_url)) {
            const { cancel: prevRequestCancel } = this.urlMap.get(_url)!
            prevRequestCancel()
            this.urlMap.delete(_url)
        } else {
            this.urlMap.set(_url, ctx)
        }
        if (WHITE_LIST.includes(_url)) {
            options.headers = {
                'Content-Type': 'application/json',
                ...options.headers,
            }
            return ctx
        }
        const token = localStorage.getItem('accessToken')
        if (!token) {
            cancel()
        }
        options.headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options.headers,
        }

        return ctx
    }

    private async afterFetch(ctx: AfterFetchContext) {
        const url = new URL(ctx.response.url).pathname

        const { data } = ctx
        if (data.code === ErrorCode.ACCESS_TOKEN_EXPIRED) {
            const accessToken = await this.refreshToken()
            const { url: fullUrl, options } = this.urlMap.get(url)!
            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`,
            }

            ctx.data = await this.request(
                {
                    url: fullUrl.split(GLOBAL_PREFIX)[1],
                    options,
                },
                { nativeResponse: true },
            )
        }

        this.urlMap.delete(url)

        return ctx
    }

    private onFetchError(ctx: OnFetchErrorContext) {
        const { code } = ctx.data ?? {}
        const router = microApp.router.getBaseAppRouter() as Router

        switch (code) {
            case ErrorCode.Forbidden:
                router.push({
                    name: mainRoutes.login.name,
                })
                break
            default:
            // todo something
        }

        return ctx
    }

    request<T>(requestParams: RequestParams, config: CustomConfig = {}): Promise<T> {
        const { url, method, data, options = {} } = requestParams
        const {
            loadingTarget,
            showErrMsg = true,
            showSuccessMsg = false,
            nativeResponse = false,
            ...fetchOptions
        } = config
        const { isFetching, data: res } = this.baseFetch(
            url,
            {
                ...options,
                body: data,
                method,
            },
            fetchOptions,
        ).json()

        useLoading(isFetching, loadingTarget)

        return new Promise((resolve, reject) => {
            watchEffect(() => {
                if (!isFetching.value && res.value) {
                    const { code, data, message } = res.value

                    if (code !== SUCCESS_CODE && showErrMsg) {
                        const m = Array.isArray(message) ? message[0] : message
                        ElMessage.error(m)

                        reject(message)
                    }
                    if (showSuccessMsg && code === SUCCESS_CODE && message) {
                        ElMessage.success(message)
                    }

                    resolve(nativeResponse ? res.value : data)
                }
            })
        })
    }

    async refreshToken() {
        const token = localStorage.getItem('refreshToken')
        const { accessToken } = await this.request<{ accessToken: string }>({
            url: '/auth/refreshToken',
            method: 'post',
            options: {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            },
        })
        localStorage.setItem('accessToken', accessToken)
        return accessToken
    }
}

const baseFetch = new BaseFetch()
const SUCCESS_CODE = 0

export function useGetRequest<T, U extends object>(url: string, params: U, config: CustomConfig = {}): Promise<T> {
    const stringifyParams = stringify(params)
    const finalUrl = `${url}?${stringifyParams}`

    return baseFetch.request<T>({ url: finalUrl, method: 'get' }, config)
}

export function usePostRequest<T>(url: string, data: object | null | undefined, config: CustomConfig = {}): Promise<T> {
    return baseFetch.request<T>(
        {
            url,
            data: data ? JSON.stringify(data) : data,
            method: 'post',
        },
        config,
    )
}

export const useBaseRequest = baseFetch.request
