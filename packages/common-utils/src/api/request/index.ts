import { createFetch, useFetch } from '@vueuse/core'
import type { AfterFetchContext, BeforeFetchContext, UseFetchOptions, OnFetchErrorContext } from '@vueuse/core'
import { WHITE_LIST } from './white-list.ts'
import { stringify } from 'qs'
import { watchEffect } from 'vue'
import { useLoading } from '../../hooks/loading.ts'

export interface CustomConfig extends UseFetchOptions {
    loadingTarget?: string | HTMLElement
    showErrMsg?: boolean
}

export interface RequestParams {
    url: string
    data?: BodyInit | null | undefined
    method: 'get' | 'post'
}

class BaseFetch {
    private readonly baseFetch: typeof useFetch
    private readonly urlMap: Map<string, () => void>

    constructor() {
        this.baseFetch = createFetch({
            baseUrl: '/api',
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

    private beforeFetch({ url, options, cancel }: BeforeFetchContext) {
        const [_url] = url.split('?')

        if (this.urlMap.has(_url)) {
            this.urlMap.get(_url)!()
        } else {
            this.urlMap.set(_url, cancel)
        }

        if (WHITE_LIST.includes(_url)) {
            options.headers = {
                'Content-Type': 'application/json',
                ...options.headers,
            }
            return {
                options,
            }
        }
        const token = localStorage.getItem('accessToken')
        if (!token) {
            cancel()
        }

        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }

        return {
            options,
        }
    }

    private afterFetch(ctx: AfterFetchContext) {
        const url = new URL(ctx.response.url).pathname
        this.urlMap.delete(url)

        return ctx
    }

    private async onFetchError(ctx: OnFetchErrorContext) {
        const { code } = ctx.data

        switch (code) {
            default:
            // todo something
        }

        return ctx
    }

    request<T>(requestParams: RequestParams, config: CustomConfig): Promise<T> {
        const { url, method, data } = requestParams
        const { loadingTarget, showErrMsg = true, ...fetchOptions } = config

        const { isFetching, data: res } = this.baseFetch(
            url,
            {
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
                        ElMessage.error(message)
                        reject(message)
                    }

                    resolve(data)
                }
            })
        })
    }
}

const baseFetch = new BaseFetch()
const SUCCESS_CODE = 0

export function useGetRequest<T, U extends object>(url: string, params: U, config: CustomConfig = {}): Promise<T> {
    const stringifyParams = stringify(params)
    const finalUrl = `${url}?${stringifyParams}`

    return baseFetch.request<T>({ url: finalUrl, method: 'get' }, config)
}

export function usePostRequest<T>(
    url: string,
    data: BodyInit | null | undefined,
    config: CustomConfig = {},
): Promise<T> {
    return baseFetch.request<T>(
        {
            url,
            data,
            method: 'post',
        },
        config,
    )
}

export const useBaseRequest = baseFetch.request
