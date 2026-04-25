import type { JSX } from "react"
import useCustomSelect from "./model/useCustomSelect"
import CustomSelect from "./ui/CustomSelect"

export const CustomSelectElement = (externalProps: any):JSX.Element => {
    const propsModel = useCustomSelect({isCountriesSelect: externalProps.isCountriesSelect, setIsCountriesSelect: externalProps.setIsCountriesSelect}),
        props = {...propsModel, ...externalProps}

    return (<CustomSelect {...props} />)
}