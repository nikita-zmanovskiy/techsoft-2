import { useEffect, useState } from "react"
import type { GlobalLoaderProps } from "../ui/GlobalLoader"

const useGlobalLoader = ():GlobalLoaderProps => {

    const [isHide, setIsHide] = useState<boolean>(false),
        [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
            let timeoutId: ReturnType<typeof setTimeout> | null = null
            const startTime:number = Date.now() 
            
            const finishLoading = ():void => {
                const elapsed:number = Date.now() - startTime
                const remaining:number = Math.max(0, 1000 - elapsed)
                
                setTimeout(():void => {
                    setIsLoading(false)
                    timeoutId = setTimeout(():void => {
                        setIsHide(true)
                    }, 500)
                }, remaining)
            }
            
            const checkReady = (): (() => void) | undefined => {
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
            
            const cleanup: (() => any) | undefined = checkReady()
            
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