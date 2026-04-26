import { CreatePaymentForm } from "@/features/create-payment";
import {type PaymentFormLogicReturn, usePaymentFormLogic} from "@/features/create-payment/model/usePaymentFormLogic";


export const CreatePaymentPage = () => {
    const props:PaymentFormLogicReturn = usePaymentFormLogic()
    return (<CreatePaymentForm {...props}/>)
}
