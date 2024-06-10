import { BaseListParams } from './types/query.ts'
import { useGetRequest } from './request'

interface User {
    id: number
    account: string
    nickname: string
    level: 'ADMIN' | 'USER'
    roleId: number | null
    role: {
        name: string
    }
    createdAt: Date
    updatedAt: Date
}

export function userListApi(params: BaseListParams) {
    return useGetRequest<User>('/user/list', params)
}
