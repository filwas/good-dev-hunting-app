'use server'

import { createProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { getProfileById } from '@/backend/profile/profile.service'
import { withSentry } from '@/utils/errHandling'
import { cache } from 'react'

export const findProfileById = cache(
  withSentry(async (profileId: string) => {
    const profile = await getProfileById(profileId)

    return createProfileModel(profile)
  }),
)
