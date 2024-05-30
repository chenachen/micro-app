import { createFetch } from '@vueuse/core'
import type {
    AfterFetchContext,
    BeforeFetchContext,
    UseFetchOptions,
    OnFetchErrorContext,
    UseFetchReturn,
} from '@vueuse/core'
import { WHITE_LIST } from './white-list'

const baseFetch = createFetch({
    baseUrl: '/api',
    options: {
        beforeFetch,
        afterFetch,
        onFetchError,
        timeout: 300,
    },
    fetchOptions: {
        mode: 'cors',
    },
})

async function beforeFetch({ url, options, cancel }: BeforeFetchContext) {
    if (WHITE_LIST.includes(url)) {
        return
    }
    const token = localStorage.getItem('token')
    if (!token) {
        cancel()
    }

    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    }

    return {
        url,
        options,
    }
}

async function afterFetch({ data, response }: AfterFetchContext) {
    window.console.log(response, data)
    return data
}

async function onFetchError({ error, data }: OnFetchErrorContext) {
    return { error, data }
}

interface CustomConfig extends UseFetchOptions {
    loadingTarget?: string | HTMLElement
    showErrMsg?: boolean
}

interface RequestParams {
    url: string
    data: unknown
    method: 'get' | 'post'
}

export async function useRequest<T>(requestParams: RequestParams, config: CustomConfig = {}) {
    const { url, method, data } = requestParams
    const { loadingTarget, showErrMsg, ...fetchOptions } = config

    if (loadingTarget) {
        // todo
        return
    }

    if (showErrMsg) {
        // todo
        return
    }

    return (await baseFetch(url, fetchOptions)[method](data)) as UseFetchReturn<T>
}
