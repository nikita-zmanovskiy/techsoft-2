import { useEffect, useState } from "react"
import type { propsFromLoader, PropsLoader } from "../ui/FormLoader"

export const useLoader = ({isLoading}: PropsLoader):propsFromLoader => {
    const [preLoader, setPreloader] = useState<boolean>(false)
    const [shouldRender, setShouldRender] = useState<boolean>(false)
    useEffect(() => {
        if(isLoading) {
            setShouldRender(true)
            const timer:number = setTimeout(():void => {
                setPreloader(true)
            }, 100)
            return ():void => clearTimeout(timer)
        } else {
            setPreloader(false)
            const timer:number = setTimeout(() => setShouldRender(false), 300)
            return ():void => clearTimeout(timer)
        }
    }, [isLoading])

    return {
        shouldRender,
        preLoader
    }
}