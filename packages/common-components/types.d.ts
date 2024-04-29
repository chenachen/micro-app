import { ElButton } from 'element-plus'
import DeleleButton from './src/buttons/DeleteButton.vue'
import RefreshButton from './src/buttons/RefreshButton.vue'

type ButtonType = typeof ElButton

export declare type RefreshButton = typeof RefreshButton & ButtonType
export declare type DeleteButton = typeof DeleleButton & ButtonType
