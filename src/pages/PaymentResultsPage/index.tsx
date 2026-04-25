import { PaymentResult, usePaymentResults } from "@/features/payment-results";
import type { JSX } from "react";
export const PaymentResultPage = ():JSX.Element => {
    const props:any = usePaymentResults()
    return (<PaymentResult {...props}   />)
}