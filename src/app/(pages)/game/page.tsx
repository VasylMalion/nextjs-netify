'use client'
import { useState, useEffect, memo } from 'react'
import {
  actions as actionsData,
  body as bodyData,
  persons as personsData,
} from './data'
import Card from '@/components/Card'
import styles from './Game.module.scss'

import FirstStep from './first-step.png'
import SecondStep from './second-step.png'
import ThirdStep from './third-step.png'
import Image from 'next/image'
import clsx from 'clsx'

const Game = () => {
  const [actions, setActions] = useState<Array<string>>([])
  const [body, setBody] = useState<Array<string>>([])
  const [persons, setPersons] = useState<Array<string>>([])
  const [initiated, setInitiated] = useState<boolean>(false)

  useEffect(() => {
    setActions(actionsData)
    setBody(bodyData)
    setPersons(personsData)
    setInitiated(true)
  }, [])

  const [currentAction, setCurrentAction] = useState<string>('')
  const [currentBody, setCurrentBody] = useState<string>('')
  const [currentPerson, setCurrentPerson] = useState<string>('')

  return (
    <div className={styles.root}>
      <div className={styles.cards}>
        <Card
          list={actions}
          value={currentAction}
          frontContent={
            <div>
              <Image
                src={FirstStep}
                alt="first-step"
                className={styles.firstStep}
              />
            </div>
          }
          disabled={!!currentAction}
          setValue={setCurrentAction}
          setList={setActions}
        />
        <Card
          list={body}
          value={currentBody}
          frontContent={
            <div>
              <Image
                src={SecondStep}
                alt="second-step"
                className={styles.secondStep}
              />
            </div>
          }
          disabled={!!currentBody || !currentAction}
          setValue={setCurrentBody}
          setList={setBody}
        />
        <Card
          list={persons}
          value={currentPerson}
          frontContent={
            <div>
              <Image
                src={ThirdStep}
                alt="third-step"
                className={styles.thirdStep}
              />
            </div>
          }
          disabled={!!currentPerson || !currentAction || !currentBody}
          setValue={setCurrentPerson}
          setList={setPersons}
        />
      </div>
      {!persons.length && !currentPerson && initiated ? (
        <>
          <div className={styles.endGame}>Кінець гри</div>
          <button className={styles.btn} onClick={() => window.location.reload()}>
            Почати знову
          </button>
        </>
      ) : (
        <button
          className={clsx(
            styles.btn,
            (!currentAction || !currentBody || !currentPerson) &&
              styles.disabled
          )}
          onClick={() => {
            setCurrentAction('')
            setCurrentBody('')
            setCurrentPerson('')
          }}
        >
          Далі
        </button>
      )}
    </div>
  )
}

export default memo(Game)
