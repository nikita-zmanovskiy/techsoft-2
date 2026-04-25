import { usePaymentFormStore } from "@/features/create-payment/model/store"
import UrlParams from "@/shared/lib/urlParams"
import type { paymentObject } from "@/shared/types/common.types"
import { useEffect} from "react"
import { useNavigate } from "react-router-dom"

type UsedElementsFromStore = {
    country: paymentObject | null,
    currency: paymentObject | null,
    payment: paymentObject | null,
    resetAll: () => void
}
type NewPayment = () => void


export const usePaymentResults = () => {
    const navigate = useNavigate(),
        urlParams:UrlParams = new UrlParams()
        
    const { country, currency, payment, resetAll }: UsedElementsFromStore = usePaymentFormStore()

    const paramsCountry:string | null = urlParams.get('country'),
         paramsCurriency:string | null = urlParams.get('currency'),
         paramsPayment:string | null = urlParams.get('payment')

    //URL - для возможности скидывать ссылки с данными, но реальная безопасность достигается только с беком

    const handleToHome = ():void => {
        resetAll()
        navigate('/')
    } 

    const createNewPayment: NewPayment = () => handleToHome()

    useEffect(() => {
        if(!country || !currency || !payment) {
            if(!paramsCountry || !paramsCurriency || !paramsPayment) handleToHome()
        } 
    }, [])

    return {
        createNewPayment,
        ...{
            country: country || {name: urlParams.get('country')},
            currency: currency || {name: urlParams.get('currency')},  
            payment: payment ||  {name: urlParams.get('payment')} 
        }
    }
}