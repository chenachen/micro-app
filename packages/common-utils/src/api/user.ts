import { BaseListParams } from './types/query.ts'
import { useGetRequest, usePostRequest } from './request'

export enum UserLevel {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface User {
    id: number
    account: string
    nickname: string
    level: UserLevel
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

export type UserForm = Partial<User> & {
    password?: string
}

export function createUserApi(data: UserForm) {
    return usePostRequest('/user/create', data, { showSuccessMsg: true })
}

export function updateUserApi(data: UserForm) {
    return usePostRequest('/user/update', data, { showSuccessMsg: true })
}

interface DeleteUserParams {
    id: number
}

export function deleteUserApi(data: DeleteUserParams) {
    return usePostRequest('/user/delete', data, { showSuccessMsg: true })
}
