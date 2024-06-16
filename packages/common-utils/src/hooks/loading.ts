import { Ref, watchEffect } from 'vue'

export function useLoading(loading: Ref<boolean>, target?: HTMLElement | string) {
    if (target) {
        const loadingInstance = ElLoading.service({
            target,
        })
        watchEffect(() => {
            if (!loading.value) {
                loadingInstance.close()
            }
        })
    }
}
