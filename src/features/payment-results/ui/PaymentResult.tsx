import styles from '@/features/payment-results/ui/PaymentResult.module.css'
import stylesCommon from '@/shared/styles/common.module.css'
import { AnimateOnMount } from "@/shared/ul/UseAnimatePages/ui/useAnimatePagesElement"
import type {PaymentDetail} from "@/features/payment-results/model/PaymentResults.ts";


export type PaymentPropsType = {
    createNewPayment: () => void,
    country: PaymentDetail,
    currency: PaymentDetail,
    payment: PaymentDetail
}

export const PaymentResult = ({createNewPayment,country, currency, payment}: PaymentPropsType) => {
    return (
    <AnimateOnMount>
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
        </AnimateOnMount>
      
    )
}