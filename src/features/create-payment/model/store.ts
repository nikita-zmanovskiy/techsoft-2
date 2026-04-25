import type { Country, Currency, Payment, PaymentStore } from "@/shared/types/common.types";
import { create } from "zustand";



export const usePaymentFormStore = create<PaymentStore>((set) => ({
    country: null,
    currency: null,
    payment: null,

    setForm: (country: Country, currency: Currency, payment: Payment) => {
        return set({
            country: {name: country.name, code: country.code}, 
            currency: {name: currency.name, code: currency.code}, 
            payment:  {name: payment.name, code: payment.code}, 
        })
    },
    resetAll: () => set({
        country: null,
        currency: null,
        payment: null,
    })
}))