import { BaseListParams } from './types/query.ts'
import { useGetRequest } from './request'

export interface User {
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

interface UserListRes {
    list: User[]
    total: number
}

export function getUserListApi(params: BaseListParams) {
    return useGetRequest<UserListRes, BaseListParams>('/user/list', params)
}
