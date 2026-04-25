import styles from '@/shared/ul/Background/styles/background.module.css'
import backgroundImage from '@/assets/background.webp'

export const Background = () => {
    return (
        <section className={styles.main__background}>
            <div style={{ backgroundImage: `url(${backgroundImage})` }} className={styles.background__image}/>

            <div className={styles.background__blur} />
      </section>
    )
}