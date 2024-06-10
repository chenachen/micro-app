export interface BaseListParams {
    skip: number
    take: number
    sortName?: string
    sortOrder?: 'asc' | 'desc'
    searchType?: string
    searchText?: string
}
