import type { Country } from "../types/common.types";

type Currency = {
    code: string
    name: string
}

type PaymentMethod = {
    name: string
    code: string
}


type CountryCurrencies = Record<string, Currency[]>;
type PaymentCurrencies = Record<string, PaymentMethod[]>;

const countryCurrences:CountryCurrencies = {
    USA: [
        {code: 'USD', name: 'Доллар'},
        {code: 'EUR', name: 'Евро'},
    ],
    GB: [
        {code: 'GBP', name: 'Фунт стерлингов'},
    ],
    GER: [
        {code: 'EUR', name: 'Евро'},
    ]
},
    paymentCurrences:PaymentCurrencies = {
        USD: [
            {name: 'Bank Account', code: 'Bank Account'},
            {name: 'PayPal', code: 'PayPal'},
        ],
        EUR: [
            {name: 'SEPA Transfer', code: 'SEPA Transfer'},
            {name: 'Payoneer', code: 'Payoneer'},
        ],
        GBP: [
            {name: 'Wise', code: 'Wise'},
            {name: 'UK Bank Transfer', code: 'UK Bank Transfer'},
        ]
    },
    countries:Country[] = [
        {code: 'USA', name: 'США'},
        {code: 'GB', name: 'Великобритания'},
        {code: 'GER', name: 'Германия'},
    ]


export const fetchAvailableCountries = ():Promise<unknown> => new Promise(
    (resolve) => {
        setTimeout(() => {
            const available:Country[] = countries
            resolve(available)
        }, 1500)
    }
)
export const fetchAvailableCurrences = (countryCode: string):Promise<unknown> => new Promise(
    (resolve) => {
        setTimeout(() => {
            const available:Currency[] = countryCurrences[countryCode]
            resolve(available)
        }, 1500)
    }
)
export const fetchAvailablePayments = (currencyCode: string):Promise<unknown> => new Promise(
    (resolve) => {
        setTimeout(() => {
            const available:PaymentMethod[] = paymentCurrences[currencyCode]
            resolve(available)
        }, 1500)
    }
)
