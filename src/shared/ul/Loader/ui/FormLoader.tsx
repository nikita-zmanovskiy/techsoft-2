import styles from '@/shared/ul/Loader/ui/loader.module.css'
import { useLoader } from '../model/UseLoader'

export type PropsLoader = {
    isLoading: boolean
}
export const FormLoader = ({isLoading}: PropsLoader) => {
    const {preLoader, shouldRender} = useLoader({isLoading})
    if (!shouldRender) return null    
    return (
        <div className={`${styles.form__loading} ${isLoading ? styles.form__loading_zindex : ""} ${preLoader ? styles.form__loading_show : ""}`}>
            <p className={styles.loading__text}>Загрузка...</p>
            <span className={styles.loader}></span>
        </div>

    )
}