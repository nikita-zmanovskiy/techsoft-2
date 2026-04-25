import type { Country, Currency, Payment } from "@/shared/types/common.types"
import styles from '@/features/create-payment/ui/CreatePaymentForm.module.css'
import arrow from '@/assets/arrow.svg'
import stylesCommon from '@/shared/styles/common.module.css'
import type { JSX } from "react"
import { CustomSelectElement } from "@/shared/ul/CustomSelect"
import { AnimateOnMount } from "@/shared/ul/UseAnimatePages/ui/useAnimatePagesElement"

export type PaymentProps = {
    availableCountries: Country[] | null,
    availablePayments: Payment[] | null,
    handleChangeCountry: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    availableCurrences: Currency[] | null,
    handleChangePayment: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleChangeTransfer: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    selectedCountry: string,
    selectedPayment: string,
    selectedTransfer: string,
    handleSubmit:() => void,
    isCurrencesLoading:boolean,
    isPaymentsLoading:boolean,
    isCoutnriesLoading:boolean,
    isCountriesSelect:boolean,
    setIsCountriesSelect: (isCountriesSelect:boolean) => void,
    isCurrencesSelect: boolean,
    setIsCurrencesSelect: (isCurrencesSelect: boolean) => void,
    isPaymentsSelect: boolean,
    setIsPaymentsSelect: (isPaymentsSelect: boolean) => void
}

export const CreatePaymentForm = ({availableCountries,availablePayments, handleChangeCountry, availableCurrences,
    handleChangePayment,handleChangeTransfer, selectedCountry, 
    selectedPayment, selectedTransfer, handleSubmit,
    isCurrencesLoading, isPaymentsLoading, isCoutnriesLoading,
    isCountriesSelect, setIsCountriesSelect, isCurrencesSelect, setIsCurrencesSelect, isPaymentsSelect, setIsPaymentsSelect
}:PaymentProps): JSX.Element => {
    return (
        <AnimateOnMount>
            <section className={styles.payment__wrapper}>
                    <h1 className={styles.payment__title}>Создание новой выплаты</h1>
                    <p className={styles.payment__description}>Выберите все варианты чтобы продолжить</p>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.payment__option_element} >
                            <CustomSelectElement optionDisabled={!availableCountries || isCoutnriesLoading} selectedCountry={selectedCountry} noOptionsText={'Доступных стран нет!'} labelText={'Выберите страну'} availableCountries={availableCountries} handleChangeCountry={handleChangeCountry} isCoutnriesLoading={isCoutnriesLoading}
                            isCountriesSelect={isCountriesSelect} setIsCountriesSelect={setIsCountriesSelect}  />
                        </div>

                        <div className={styles.payment__option_element} style={{ backgroundImage: `url(${arrow})` }} >
                            <CustomSelectElement optionDisabled={!selectedCountry || isCurrencesLoading} selectedCountry={selectedPayment} noOptionsText={'Доступных валют нет!'} labelText={'Выберите валюту'} availableCountries={availableCurrences} handleChangeCountry={handleChangePayment} isCoutnriesLoading={isCurrencesLoading}
                            isCountriesSelect={isCurrencesSelect} setIsCountriesSelect={setIsCurrencesSelect}  />
                        </div>

                        <div  style={{ backgroundImage: `url(${arrow})` }} className={`${styles.form__item_wrapper} ${styles.payment__option_element}`}>

                            <CustomSelectElement optionDisabled={!selectedPayment || isPaymentsLoading} selectedCountry={selectedTransfer} noOptionsText={'Доступных способов оплаты нет!'} labelText={'Выберите способ оплаты'} availableCountries={availablePayments} handleChangeCountry={handleChangeTransfer} isCoutnriesLoading={isPaymentsLoading}
                            isCountriesSelect={isPaymentsSelect} setIsCountriesSelect={setIsPaymentsSelect}  />
                        
                        </div>

                        <button className={`${stylesCommon.form__submit_button} ${(selectedPayment && selectedCountry && selectedTransfer) ? stylesCommon.form__submit_button_active : ''}`} type='submit' disabled={!(selectedPayment && selectedCountry && selectedTransfer)}>
                            Создать выплату
                        </button>

                    </form>

                    

            </section>
        </AnimateOnMount>
    )
} 