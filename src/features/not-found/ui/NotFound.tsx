
import { Link } from 'react-router-dom'
import styles from '@/features/not-found/ui/NotFound.module.css'
import type { JSX } from 'react'


export const NotFound = ():JSX.Element => {
    return (
    
        <section className={styles.notfound__wrapper}>
             <p className={styles.notfound__title}>Страница не найдена</p>
                <Link className={styles.notfound__link} to="/" viewTransition>
                     Перейти на Главную страницу
              </Link>

         </section>
    )
}