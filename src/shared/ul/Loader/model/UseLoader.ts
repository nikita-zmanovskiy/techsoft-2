import { useEffect, useState } from "react"
import type { PropsLoader } from "../ui/FormLoader"

export const useLoader = ({isLoading}: PropsLoader) => {
    const [preLoader, setPreloader] = useState<boolean>(false)
    const [shouldRender, setShouldRender] = useState<boolean>(false)
    useEffect(() => {
        if(isLoading) {
            setShouldRender(true)
            const timer = setTimeout(() => {
                setPreloader(true)
            }, 100)
            return () => clearTimeout(timer)
        } else {
            setPreloader(false)
            const timer = setTimeout(() => setShouldRender(false), 300)
            return () => clearTimeout(timer)
        }
    }, [isLoading])

    return {
        shouldRender,
        preLoader
    }
}