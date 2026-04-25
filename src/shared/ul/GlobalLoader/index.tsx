import useGlobalLoader from './model/useGlobalLoader'
import { GlobalLoader, type GlobalLoaderProps } from './ui/GlobalLoader'
export const GlobalLoaderComponent = () => {
    const props:GlobalLoaderProps = useGlobalLoader()
   return <GlobalLoader {...props} />
}