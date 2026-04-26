import { fetchAvailableCurrences } from "@/shared/api"
import { fetchAvailableCountries, fetchAvailablePayments } from "@/shared/api/mocks"
import { useEffect, useState } from "react"
import { usePaymentFormStore } from "./store"
import { useNavigate } from "react-router-dom"
import MemoryCache from "./cache"
import UrlParams from "@/shared/lib/urlParams"
import type {Country, Currency, MemoryCacheInstant, Payment, storeFunc} from "@/shared/types/common.types"


//TODO: сделать если пришел пустой массив
export const cache:MemoryCacheInstant = new MemoryCache()
export const COUNTRIES_CACHE_KEY:string = 'CountriesCache'

type availablePayment = {
    name: string
    code: string
}
export type PaymentFormLogicReturn = {
    availableCountries: Country[] | null
    availableCurrences: Currency[] | null
    availablePayments: availablePayment[] | null

    handleChangeCountry: (e: React.ChangeEvent<HTMLSelectElement>) => Promise<void>
    handleChangePayment: (e: React.ChangeEvent<HTMLSelectElement>) => Promise<void>
    handleChangeTransfer: (e: React.ChangeEvent<HTMLSelectElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void

    selectedCountry: string | null
    selectedPayment: string | null
    selectedTransfer: string | null

    isCoutnriesLoading: boolean | null
    isCurrencesLoading: boolean | null
    isPaymentsLoading: boolean | null
    globalError: string | null
    isCountriesSelect: boolean
    setIsCountriesSelect: React.Dispatch<React.SetStateAction<boolean>>
    isCurrencesSelect: boolean
    setIsCurrencesSelect: React.Dispatch<React.SetStateAction<boolean>>
    isPaymentsSelect: boolean
    setIsPaymentsSelect: React.Dispatch<React.SetStateAction<boolean>>
}


export const usePaymentFormLogic = ():PaymentFormLogicReturn => {
    const [availablePayments, setAvailablePayments] = useState<availablePayment[] | null>(null),
         [availableCurrences, setAvailableCurrences] = useState<Currency[] | null>(null),
         [availableCountries, setAvailableCountries] = useState<Country[] | null>(null)

    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null),
        [selectedPayment, setSelectedPayment] = useState<Currency | null>(null),
        [selectedTransfer, setSelectedTransfer] = useState<Payment | null>(null)

    const [isCurrencesLoading, setIsCurrencesLoading] = useState<boolean | null>(false),
        [isPaymentsLoading, setIsPaymentsLoading] = useState<boolean | null>(false),
        [isCoutnriesLoading, setIsCountriesLoading] = useState<boolean | null>(false)

    const [isCountriesSelect, setIsCountriesSelect] = useState<boolean>(false),
         [isPaymentsSelect, setIsPaymentsSelect] = useState<boolean>(false),
        [isCurrencesSelect, setIsCurrencesSelect] = useState<boolean>(false)

    const [globalError, setGlobalError] = useState<string | null>(null)


    useEffect(():void => {
        const getInitionalCountries = async ():Promise<void> => {
            setIsCountriesLoading(true)
            try {
                const chacheData:Country[] | null = cache.get(COUNTRIES_CACHE_KEY)
                if(chacheData) {
                    setAvailableCountries(chacheData)
                } else {
                    const response:unknown = await fetchAvailableCountries()
                    if(Array.isArray(response)) {
                        const countries:Country[] = response as Country[]
                        setAvailableCountries(countries)
                        cache.set(COUNTRIES_CACHE_KEY, countries)
                    }
                    
                }
                
            } catch (e: unknown) {
                if (e instanceof Error) {
                    console.error(e.message)
                } else {
                    console.error("Произошла неизвестная ошибка", e)
                }
                setGlobalError('Произошла ошибка запроса')
            } finally {
                setIsCountriesLoading(false)
            }
        }
        getInitionalCountries()
    }, [])


    const {setForm}:storeFunc = usePaymentFormStore(),
        navigate = useNavigate()

    const handleClearAll = ():void => {
        setSelectedCountry(null)
        setSelectedPayment(null)
        setSelectedTransfer(null)
    }

    


    const handleChangeCountry = async (e: React.ChangeEvent<HTMLSelectElement>):Promise<void>  => {
        if(!availableCountries || isCoutnriesLoading) return 
        
        const countryCode:string | null = e.currentTarget.getAttribute('data-value')
        if(selectedCountry && selectedCountry.code === countryCode) {
            setIsCountriesSelect(false)
            return
        } 
        if (!countryCode) {
            console.error("Код страны не найден")
            setGlobalError('Произошла ошибка запроса')
            return
        } 
        const findCountry: Country | undefined = availableCountries?.find((country) => country.code === countryCode)
        if(!findCountry?.name) return
        setIsCountriesSelect(false)
        handleClearAll()
        setSelectedCountry({code: countryCode, name: findCountry.name})
        setIsCurrencesLoading(true)
        try {
            const responce:unknown = await fetchAvailableCurrences(countryCode)
            if(Array.isArray(responce)) { 
                setAvailableCurrences(responce)
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                 console.error(e.message)
            } else {
                console.error("Произошла неизвестная ошибка", e)
            }
            setGlobalError('Произошла ошибка запроса')
            
        } finally {
            setIsCurrencesLoading(false)
        }
    }

    const handleChangePayment = async (e: React.ChangeEvent<HTMLSelectElement>):Promise<void> => {
        if(!selectedCountry || isCurrencesLoading) return 
        
        const countryCode:string | null = e.currentTarget.getAttribute('data-value')
        if(selectedPayment && selectedPayment.code === countryCode) {
            setIsCurrencesSelect(false)
            return
        } 
       
        if (!countryCode) {
            console.error("Код страны не найден")
            setGlobalError('Произошла ошибка запроса')
            return
        } 
        setIsCurrencesSelect(false)
        setSelectedTransfer(null)

        const findCurrency:Currency | undefined = availableCurrences?.find((currency) => currency.code === countryCode)
        if(!findCurrency?.name) return
        setSelectedPayment({code: countryCode, name: findCurrency?.name })

        setIsPaymentsLoading(true)
        try {
            const responce:unknown = await fetchAvailablePayments(countryCode)
            if(Array.isArray(responce)) { 
                setAvailablePayments(responce)
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                 console.error(e.message)
            } else {
                console.error("Произошла неизвестная ошибка", e)
            }
            setGlobalError('Произошла ошибка запроса')

               
        } finally {
            setIsPaymentsLoading(false)
        }
        
    }


    const handleChangeTransfer = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        if(!selectedCountry || !selectedPayment || isPaymentsLoading) return 
        const countryCode:string | null = e.currentTarget.getAttribute('data-value')
        if(selectedTransfer && selectedTransfer.code === countryCode) { 
            setIsPaymentsSelect(false)
            return
        }

        const findCurrency:availablePayment | undefined = availablePayments?.find((payment) => payment.code === countryCode)
        if(findCurrency?.name && countryCode) {
            setSelectedTransfer({code: countryCode, name: findCurrency.name})
            setIsPaymentsSelect(false)
        } else {
            setGlobalError('Произошла ошибка')
        }

    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        if(selectedCountry && selectedPayment && selectedTransfer &&
            selectedCountry.code && selectedPayment.code && selectedTransfer.code && availableCountries && availableCurrences) {
          
            
            const findCountry: Country | null = availableCountries.find((country:Country) => country.code === selectedCountry.code) || null,
                 findCurrency:Currency | null = availableCurrences.find((payment:Currency) => payment.code === selectedPayment.code ) || null

            if(findCountry && findCurrency) {
                setForm({name: findCountry.name,code: selectedCountry.code}, 
                {name: findCurrency.name, code: selectedPayment.code}, 
                {name: selectedTransfer.name, code: selectedTransfer.code})
                const urlParams:UrlParams = new UrlParams()
                urlParams.set('country', findCountry.name)
                urlParams.set('currency', findCurrency.name)
                const result:string = urlParams.set('payment', selectedTransfer.code)
                navigate(`/payment-results${result}`)
            } else {
                console.error('Произошла неизвесная ошибка!')
                setGlobalError('Произошла ошибка запроса')
            }
            
        }
    }
    
    return {availableCountries, handleChangeCountry,
        availablePayments,globalError, availableCurrences, handleChangePayment,
        handleChangeTransfer, selectedCountry: selectedCountry ? selectedCountry.name : null, selectedPayment: selectedPayment ? selectedPayment.name : null, 
        selectedTransfer: selectedTransfer ? selectedTransfer.name : null, handleSubmit, isPaymentsLoading,
        isCurrencesLoading, isCoutnriesLoading, isCountriesSelect, setIsCountriesSelect,
        isCurrencesSelect, setIsCurrencesSelect, isPaymentsSelect, setIsPaymentsSelect
    }
}