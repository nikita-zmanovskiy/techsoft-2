import type { Country } from '@/shared/types/common.types'
import styles from '@/shared/ul/CustomSelect/ui/CustomSelect.module.css'
import { FormLoader } from '../../Loader/ui/FormLoader'
import type { JSX } from 'react'
import type React from 'react'

export type CustomSelectProps = {
    labelText: string, 
    optionDisabled: boolean,
    noOptionsText: string,
    selectRef: null
    isCountriesSelect: boolean
    isCoutnriesLoading: boolean
    setIsCountriesSelect: (isCountriesSelect: boolean) => void
    handleChangeCountry: (e: React.MouseEvent<HTMLLIElement>) => void
    availableCountries: Country[]
    selectedCountry: string
}

const CustomSelect = ({labelText, optionDisabled, noOptionsText,selectRef, isCountriesSelect, isCoutnriesLoading, setIsCountriesSelect, handleChangeCountry, availableCountries, selectedCountry}: CustomSelectProps):JSX.Element => {
    return (
        <section ref={selectRef}>
            <label className={styles.payment__option_label} htmlFor="country">{labelText}</label>
            <section className={`${styles.form__item_wrapper} ${isCountriesSelect ? styles.payment__option_show : ""}`}>
                    <FormLoader isLoading={isCoutnriesLoading} />
                    <div onClick={() => {
                       if(!optionDisabled) setIsCountriesSelect(!isCountriesSelect)
                    }} className={`${styles.payment__option_select} ${(optionDisabled) ? styles.custom__select_disable : ""} ${availableCountries ? styles.payment__option_active : ''}`} id="country" >
                        <p>{selectedCountry || labelText}</p>
                    </div>
                    <ul className={`${styles.custom__select_drop} ${isCountriesSelect ? styles.custom__select_show : ""}`}>
                        {availableCountries && availableCountries.length != 0 && availableCountries.map((country: Country, index: number) => <li key={`${country.code || index || country.name}`} onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                            handleChangeCountry(e)
                        }} className={`${styles.customSelect__option_item}`} data-value={country.code}>{country.name}</li>)}
                        {availableCountries && availableCountries.length == 0 && <li data-value="">{noOptionsText}</li>}
                    </ul>
            </section>
        </section>
    )
}

export default CustomSelect