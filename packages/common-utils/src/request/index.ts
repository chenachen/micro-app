import { createFetch } from '@vueuse/core'
import type {
    AfterFetchContext,
    BeforeFetchContext,
    UseFetchOptions,
    OnFetchErrorContext,
    UseFetchReturn,
} from '@vueuse/core'

const baseFetch = createFetch({
    baseUrl: '/api',
    options: {
        beforeFetch,
        afterFetch,
        onFetchError,
        timeout: 30000,
    },
    fetchOptions: {
        mode: 'cors',
    },
})

async function beforeFetch({ url, options, cancel }: BeforeFetchContext) {
    window.console.log(url, options, cancel)
}

async function afterFetch({ data, response }: AfterFetchContext) {
    window.console.log(response, data)
    return data
}

async function onFetchError({ error, data }: OnFetchErrorContext) {
    return { error, data }
}

interface CustomConfig extends UseFetchOptions {
    loadingTarget: string | HTMLElement
    showErrMsg: boolean
}

interface RequestParams {
    url: string
    data: unknown
    method: 'get' | 'post'
}

export async function request<T>(requestParams: RequestParams, config: CustomConfig) {
    const { url, method, data } = requestParams
    const { loadingTarget, showErrMsg, ...fetchOptions } = config

    window.console.log(loadingTarget, showErrMsg)

    return (await baseFetch(url, fetchOptions)[method](data)) as UseFetchReturn<T>
}
