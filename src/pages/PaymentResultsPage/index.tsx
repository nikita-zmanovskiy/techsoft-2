import { PaymentResult, usePaymentResults } from "@/features/payment-results";
import type { JSX } from "react";
import type {PaymentResultsReturn} from "@/features/payment-results/model/PaymentResults.ts";
export const PaymentResultPage = ():JSX.Element => {
    const props:PaymentResultsReturn = usePaymentResults()
    return (<PaymentResult {...props}   />)
}