import { PaymentResult, usePaymentResults } from "@/features/payment-results";
export const PaymentResultPage = () => {
    const props:any = usePaymentResults()
    return (<PaymentResult {...props}   />)
}