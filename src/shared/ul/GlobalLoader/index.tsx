import type { JSX } from 'react'
import useGlobalLoader from './model/useGlobalLoader'
import { GlobalLoader, type GlobalLoaderProps } from './ui/GlobalLoader'
export const GlobalLoaderComponent = ():JSX.Element => {
    const props:GlobalLoaderProps = useGlobalLoader()
   return <GlobalLoader {...props} />
}