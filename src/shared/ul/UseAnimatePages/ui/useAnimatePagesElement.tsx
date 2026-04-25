import {  type JSX, type ReactNode } from 'react'
import styles from '@/shared/ul/UseAnimatePages/styles/styles.module.css'
import { useAnimationPagesModel } from '../model/useAnimationPagesModel'

type AnimateOnMountProps = {
  children: ReactNode
}
export type AnimateProps = {
  isVisible: boolean
}

export const AnimateOnMount = ({ children }: AnimateOnMountProps):JSX.Element => {
  const {isVisible}: AnimateProps = useAnimationPagesModel()

  return (
    <div className={`${styles.page} ${isVisible ? styles.visible : ''}`}>
      {children}
    </div>
  )
}