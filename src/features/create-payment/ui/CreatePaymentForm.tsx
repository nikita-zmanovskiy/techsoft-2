import type { Country, Currency, Payment } from "@/shared/types/common.types"
import styles from '@/features/create-payment/ui/CreatePaymentForm.module.css'
import { FormLoader } from "@/shared/ul/Loader/ui/FormLoader"
import arrow from '@/assets/arrow.svg'
import stylesCommon from '@/shared/styles/common.module.css'
import { motion } from 'framer-motion'
import type { JSX } from "react"

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
    <motion.div
        initial={{ opacity: 0, y: 20 }}  
        animate={{ opacity: 1, y: 0 }}  
        exit={{ opacity: 0, y: -20 }}     
        transition={{ duration: 0.3 }}    
        >
        <section className={styles.payment__wrapper}>
                <h1 className={styles.payment__title}>Создание новой выплаты</h1>
                <p className={styles.payment__description}>Выберите все варианты чтобы продолжить</p>

                <form onSubmit={handleSubmit}>
                    <div className={styles.payment__option_element} >
                        <label className={styles.payment__option_label} htmlFor="country">Выберите страну</label>
                        <section className={`${styles.form__item_wrapper} ${isCountriesSelect ? styles.payment__option_show : ""}`}>
                            <FormLoader isLoading={isCoutnriesLoading} />
                            <select onClick={() => setIsCountriesSelect(!isCountriesSelect)} 
                            onBlur={() => setIsCountriesSelect(false)}
                            className={`${styles.payment__option_select} ${availableCountries ? styles.payment__option_active : ''}`} required  onChange={(e) => {
                                handleChangeCountry(e)
                                setIsCountriesSelect(true)
                            }} id="country" disabled={!availableCountries || isCoutnriesLoading} value={selectedCountry || ''}>
                                <option value="" disabled>Выберите страну</option>
                                {availableCountries && availableCountries.length != 0 && availableCountries.map((country: Country) => <option key={country.code} value={country.code}>{country.name}</option>)}
                                {availableCountries && availableCountries.length == 0 && <option value="" disabled>Доступных стран нет!</option>}
                            </select>
                        </section>
                    </div>

                    <div className={styles.payment__option_element} style={{ backgroundImage: `url(${arrow})` }} >
                        <label className={styles.payment__option_label} htmlFor="currency">Валюта выплаты</label>
                        <section  className={`${styles.form__item_wrapper} ${isCurrencesSelect ? styles.payment__option_show : ""}`}>
                            <FormLoader isLoading={isCurrencesLoading} />
                            <select onClick={() => setIsCurrencesSelect(!isCurrencesSelect)}
                            onBlur={() => setIsCurrencesSelect(false)}  className={`${styles.payment__option_select} ${availableCurrences ? styles.payment__option_active : ''}`} required onChange={(e) => {
                                handleChangePayment(e)
                                setIsCurrencesSelect(true)
                            }} id="currency" disabled={!selectedCountry || isCurrencesLoading} value={selectedPayment || ''}>
                                <option value='' disabled>Выберите валюту</option>
                                {availableCurrences && availableCurrences.map((currency: any, index: number) => <option key={currency.code + index} value={currency.code}>{currency.name}</option>)}
                                {availableCurrences && availableCurrences.length == 0 && <option value="" disabled>Доступных валют нет!</option>}

                            </select>
                        </section>
                    </div>

                    <div  style={{ backgroundImage: `url(${arrow})` }} className={`${styles.form__item_wrapper} ${styles.payment__option_element}`}>
                        <label className={styles.payment__option_label} htmlFor="payment">Способ выплаты</label>
                        <section className={`${styles.form__item_wrapper} ${isPaymentsSelect ? styles.payment__option_show : ""}`}>
                            <FormLoader isLoading={isPaymentsLoading} />
                            <select onClick={() => setIsPaymentsSelect(!isPaymentsSelect)}
                            onBlur={() => setIsPaymentsSelect(false)} className={`${styles.payment__option_select}  ${availablePayments ? styles.payment__option_active : ''}`} required onChange={(e) => {
                                handleChangeTransfer(e)
                                setIsPaymentsSelect(true)
                            }}  disabled={!selectedPayment || isPaymentsLoading} id="payment" value={selectedTransfer || ''}>
                                <option value="" disabled>Выберите способ оплаты</option>
                                {availablePayments && availablePayments.map((payment: any, index: number) => <option key={payment.transferType + index} value={payment.transferType}>{payment.transferType}</option>)}
                                {availablePayments && availablePayments.length == 0 && <option value="" disabled>Доступных способов оплаты нет!</option>}
                                
                            </select>
                        </section>
                    
                    </div>

                    <button className={`${stylesCommon.form__submit_button} ${(selectedPayment && selectedCountry && selectedTransfer) ? stylesCommon.form__submit_button_active : ''}`} type='submit' disabled={!(selectedPayment && selectedCountry && selectedTransfer)}>
                        Создать выплату
                    </button>

                </form>

                

        </section>
     </motion.div>
      
    )
} 