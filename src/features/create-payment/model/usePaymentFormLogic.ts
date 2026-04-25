import { fetchAvailableCurrences } from "@/shared/api"
import { fetchAvailableCountries, fetchAvailablePayments } from "@/shared/api/mocks"
import { useEffect, useState } from "react"
import { usePaymentFormStore } from "./store"
import { useNavigate } from "react-router-dom"
import MemoryCache from "./cache"
import UrlParams from "@/shared/lib/urlParams"
import type { Country, Currency, MemoryCacheInstant, storeFunc } from "@/shared/types/common.types"


//TODO: сделать если пришел пустой массив
export const cache:MemoryCacheInstant = new MemoryCache()
export const COUNTRIES_CACHE_KEY:string = 'CountriesCache'

type availablePayment = {
    transferType: string
}


export const usePaymentFormLogic = () => {
    const [availablePayments, setAvailablePayments] = useState<availablePayment[] | null>(null),
         [availableCurrences, setAvailableCurrences] = useState<Currency[] | null>(null),
         [availableCountries, setAvailableCountries] = useState<Country[] | null>(null)

    const [selectedCountry, setSelectedCountry] = useState<string | null>(null),
        [selectedPayment, setSelectedPayment] = useState<string | null>(null),
        [selectedTransfer, setSelectedTransfer] = useState<string | null>(null)

    const [isCurrencesLoading, setIsCurrencesLoading] = useState<boolean | null>(false),
        [isPaymentsLoading, setIsPaymentsLoading] = useState<boolean | null>(false),
        [isCoutnriesLoading, setIsCountriesLoading] = useState<boolean | null>(false)

    const [isCountriesSelect, setIsCountriesSelect] = useState<boolean>(false),
         [isPaymentsSelect, setIsPaymentsSelect] = useState<boolean>(false),
        [isCurrencesSelect, setIsCurrencesSelect] = useState<boolean>(false)




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
                        const countries = response as Country[]
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


    const handleChangeCountry = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.target.blur()
        handleClearAll()
        const countryCode:string = e.target.value
        setSelectedCountry(countryCode)
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
               
        } finally {
            setIsCurrencesLoading(false)
        }
        
        
        
    }

    const handleChangePayment = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.target.blur()
        setSelectedTransfer(null)

        const countryCode:string = e.target.value
        setSelectedPayment(countryCode)

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
               
        } finally {
            setIsPaymentsLoading(false)
        }
        
    }


    const handleChangeTransfer = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.target.blur()
        const countryCode:string = e.target.value
        setSelectedTransfer(countryCode)
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(selectedCountry && selectedPayment && selectedTransfer && availableCountries && availableCurrences) {
          
            
            const findCountry: Country | null = availableCountries.find((country) => country.code === selectedCountry) || null,
                 findCurrency:Currency | null = availableCurrences.find((payment: any) => payment.code === selectedPayment) || null

            if(findCountry && findCurrency) {
                setForm({name: findCountry.name,code: selectedCountry}, 
                {name: findCurrency.name, code: selectedPayment}, 
                {name: selectedTransfer, code: selectedTransfer})
                const urlParams:UrlParams = new UrlParams()
                urlParams.set('country', findCountry.name)
                urlParams.set('currency', findCurrency.name)
                const result:string = urlParams.set('payment', selectedTransfer)
                navigate(`/payment-results${result}`)
            } else {
                console.error('Произошла неизвесная ошибка!')
            }
            
        }
    }
    
    return {availableCountries, handleChangeCountry,
        availablePayments, availableCurrences, handleChangePayment,
        handleChangeTransfer, selectedCountry, selectedPayment, 
        selectedTransfer, handleSubmit, isPaymentsLoading,
        isCurrencesLoading, isCoutnriesLoading, isCountriesSelect, setIsCountriesSelect,
        isCurrencesSelect, setIsCurrencesSelect, isPaymentsSelect, setIsPaymentsSelect
    }
}