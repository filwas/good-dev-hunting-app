'use client'
import classNames from 'classnames/bind'
import React, { type PropsWithChildren } from 'react'
import styles from './DevTypeButton.module.scss'

import { type JobSpecialization } from '@/app/[locale]/(profile)/profile.types'
const cx = classNames.bind(styles)

interface DevTypeButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant:
    | JobSpecialization.Frontend
    | JobSpecialization.Backend
    | JobSpecialization.Fullstack
  isPressed: boolean
}

export const DevTypeButton = ({
  onClick,
  children,
  variant,
  isPressed,
}: PropsWithChildren<DevTypeButtonProps>) => {
  const getDevTypeButtonClasses = cx({
    [styles.default]: true,
    [variant]: true,
    [styles.pressed]: isPressed,
  })

  return (
    <button className={getDevTypeButtonClasses} onClick={onClick}>
      {children}
    </button>
  )
}
