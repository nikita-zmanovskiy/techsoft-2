 
export type paymentObject = {
    name: string, 
    code: string
}

export type FormState = {
    country: Country,
    currency: Currency,
    payment: Payment
}
export type Currency = {
    code: string,
    name: string
}
export type Payment = {
    code: string,
    name: string
}

export type MemoryCacheInstant = {
    get: (key: string) => Country[] | null,
    set: (key:string, data:Country[]) => void
}
export type storeFunc = {
    setForm: (country: Country, currency: Currency, payment: Payment) => void
}
export type PaymentStore = {
    country: paymentObject | null,
    currency: paymentObject | null,
    payment: paymentObject | null,
    setForm: (country: Country, currency: Currency, payment: Payment) => void,
    resetAll: () => void
    
}

export type Country = {
    code: string,
    name: string
}

