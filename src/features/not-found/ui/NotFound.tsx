import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styles from '@/features/not-found/ui/NotFound.module.css'


export const NotFound = () => {
    return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}  
            animate={{ opacity: 1, y: 0 }}  
            exit={{ opacity: 0, y: -20 }}     
            transition={{ duration: 0.3 }}    
            >
                <section className={styles.notfound__wrapper}>
                    <p className={styles.notfound__title}>Страница не найдена</p>
                    <Link className={styles.notfound__link} to="/" viewTransition>
                        Перейти на Главную страницу
                    </Link>

                </section>

            </motion.div>
       
       
    )
}