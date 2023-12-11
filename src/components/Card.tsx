'use client'
import { FunctionComponent, ReactNode, memo } from 'react'
import styles from './Card.module.scss'
import clsx from 'clsx'

type CardProps = {
  list: Array<string>
  value: string
  frontContent: ReactNode
  disabled: boolean
  setValue: (value: string) => void
  setList: (value: Array<string>) => void
}

const Card: FunctionComponent<CardProps> = ({ list, value, frontContent, disabled, setValue, setList }) => {
  function randomInteger(min: number, max: number) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
  }

  const backValue = list[randomInteger(0, list.length - 1)]

  const index = list.findIndex(item => item === backValue)
  
  return (
    <div
      className={clsx(styles.root, value && styles.flipped, disabled && styles.disabled )}
      onClick={() => {
        if (!disabled) {
          setValue(backValue)
          setList([
            ...list.slice(0, index),
            ...list.slice(index + 1),
          ])
        }
      }}
    >
      <div className={styles.inner}>
        <div className={styles.front}>{frontContent}</div>
        <div className={styles.back}>{value}</div>
      </div>
    </div>
  )
}

export default memo(Card)
