import type { Country, Currency, Payment } from "@/shared/types/common.types"
import styles from '@/features/payment-results/ui/PaymentResult.module.css'
import stylesCommon from '@/shared/styles/common.module.css'
import { motion } from 'framer-motion'

export type PaymentPropsType = {
    createNewPayment: () => void,
    country: Country,
    currency: Currency,
    payment: Payment
}

export const PaymentResult = ({createNewPayment,country, currency, payment}: PaymentPropsType) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}  
            animate={{ opacity: 1, y: 0 }}  
            exit={{ opacity: 0, y: -20 }}     
            transition={{ duration: 0.3 }}    
            >
             <section className={styles.results__wrapper}>
                    <div className={styles.results__wrapper_items}>  
                        <div className={styles.results__wrapper_item}>
                            <p className={styles.results__descripton}>Выбранная страна: <span>{country && country.name}</span></p>
                        
                        </div> 
                        <div className={styles.results__wrapper_item}>
                            <p className={styles.results__descripton}>Выбранная валюта: <span>{currency && currency.name}</span></p>
                        </div>
                    </div>

                    <div className={styles.results__wrapper_item}>
                        <p className={styles.results__descripton}>Выбранная выплата: <span>{payment && payment.name}</span> </p>
                    </div>
                    <button className={`${stylesCommon.form__submit_button} ${stylesCommon.form__submit_button_active} ${styles.payment__result_button} `} onClick={createNewPayment}>Создать новую выплату</button>
                
                
            </section>

        </motion.div>
      
    )
}