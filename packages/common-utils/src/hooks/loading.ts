import { Ref, watchEffect } from 'vue'
import { Loading } from '@element-plus/icons-vue'

export function useLoading(loading: Ref<boolean>, target?: HTMLElement | string) {
    if (target) {
        const loadingInstance = ElLoading.service({
            target,
            spinner: Loading,
        })
        watchEffect(() => {
            if (!loading.value) {
                loadingInstance.close()
            }
        })
    }
}
