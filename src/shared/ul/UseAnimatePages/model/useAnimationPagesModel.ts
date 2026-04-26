import { useEffect, useState } from "react"
import type { AnimateProps } from "../ui/useAnimatePagesElement"

export const useAnimationPagesModel = ():AnimateProps => {

    const [isVisible, setIsVisible] = useState<boolean>(false)

    useEffect((): (() => void) => {
        const timer:number = setTimeout(():void => setIsVisible(true), 10)
        return () => clearTimeout(timer)
    }, [])
  

    return {
        isVisible
    }
}