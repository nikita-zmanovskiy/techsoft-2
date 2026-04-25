import { useEffect, useState } from "react"

const useGlobalLoader = () => {

    const [isHide, setIsHide] = useState(false),
        [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
            let timeoutId: ReturnType<typeof setTimeout> | null = null
            const startTime = Date.now() 
            
            const finishLoading = () => {
                const elapsed = Date.now() - startTime
                const remaining = Math.max(0, 1000 - elapsed)
                
                setTimeout(() => {
                    setIsLoading(false)
                    timeoutId = setTimeout(() => {
                        setIsHide(true)
                    }, 500)
                }, remaining)
            }
            
            const checkReady = () => {
                const isAppReady: boolean = document.readyState === 'complete'
                
                if (isAppReady) {
                    finishLoading()
                } else {
                    const onLoad = (): void => {
                        finishLoading()
                    }
                    
                    window.addEventListener('load', onLoad)
                    return (): void => {
                        window.removeEventListener('load', onLoad)
                    }
                }
            }
            
            const cleanup = checkReady()
            
            return () => {
                if (cleanup) cleanup()
                if (timeoutId) clearTimeout(timeoutId)
            }
        }, [])


    return {
        isHide,
        isLoading
    }
}
export default useGlobalLoader