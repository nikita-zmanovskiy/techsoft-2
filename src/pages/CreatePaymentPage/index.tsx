import { CreatePaymentForm } from "@/features/create-payment";
import { usePaymentFormLogic } from "@/features/create-payment/model/usePaymentFormLogic";

export const CreatePaymentPage = () => {
    const props:any = usePaymentFormLogic()
    return (<CreatePaymentForm {...props}/>)
}
