import styles from '@/shared/ul/GlobalLoader/styles/GlobalLoader.module.css'

export type GlobalLoaderProps = {
    isLoading: boolean,
    isHide: boolean
}
export const GlobalLoader = ({isHide, isLoading}: GlobalLoaderProps) => {

    if(isHide) return

    return (
        <section className={`${styles.globalLoader__overlay} ${!isLoading ? styles.globalLoader__overlay_hide : ""} `}>
            <div className={styles.globalLoader__wrapper}>
                <p>Загрузка...</p>
            </div>
        </section>
    )
}