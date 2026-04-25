
import { useEffect, useRef, type RefObject, } from "react"

export type CustomSelect = {
    isCountriesSelect: boolean,
    setIsCountriesSelect: (args:boolean) => void
}
export type ReturnProps = {
    selectRef:  RefObject<HTMLDivElement | null>
}

const useCustomSelect = ({isCountriesSelect, setIsCountriesSelect}: CustomSelect):ReturnProps => {
    
    const selectRef = useRef<HTMLDivElement>(null)

    useEffect(():(() => void) => {
        const handleClickOutside = (event: MouseEvent):void => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsCountriesSelect(false)
            }
        }

        if (isCountriesSelect) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        };
    }, [isCountriesSelect, setIsCountriesSelect])
    return {
       selectRef
    }
} 
export default useCustomSelect