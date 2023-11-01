import { ProfileModel } from '@/data/frontend/profile/types'
import { PublishingState } from '@prisma/client'
import { useState, useEffect } from 'react'

export default function (
  data: ProfileModel[],
  state: PublishingState,
  callback: (value: number) => void,
) {
  useEffect(() => {
    const counter = data.reduce(
      (acc, item) => (item.state === state ? (acc += 1) : acc),
      0,
    )
    callback(counter)
  }, [data])
}