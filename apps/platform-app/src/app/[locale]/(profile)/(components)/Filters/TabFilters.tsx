﻿'use client'
import { SpecializationTab } from '@/app/[locale]/(profile)/(components)/Filters/SpecializationsTabs/SpecializationTabs/SpecializationTab'
import { useProfiles } from '@/app/[locale]/(profile)/_providers/Profiles.provider'
import {
  createQueryString,
  filterBySpecialization,
  jobSpecializationThemes,
} from '@/app/[locale]/(profile)/profile.helpers'
import {
  JobOfferFiltersEnum,
  type JobSpecialization,
} from '@/app/[locale]/(profile)/profile.types'
import { type DropdownOption } from '@gdh/ui-system'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import styles from './Filters.module.scss'

type TabFiltersProps = {
  specializations: DropdownOption[]
}

export const TabFilters = ({ specializations }: TabFiltersProps) => {
  const { allProfiles, handleFilterProfiles } = useProfiles()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSetSpecialization =
    (filterName: JobOfferFiltersEnum, value: string) => () => {
      const newSearchParams = createQueryString(filterName, value, searchParams)
      router.replace(`${pathname}?${newSearchParams}`)
    }

  const getProfilesBySpecialization = (specialization: JobSpecialization) => {
    const specProfiles = allProfiles.filter(
      filterBySpecialization([specialization]),
    )

    return handleFilterProfiles(specProfiles, {
      disableSpecFilter: true,
    })
  }

  const getAllProfiles = () => {
    return handleFilterProfiles(allProfiles, {
      disableSpecFilter: true,
    })
  }

  const allProfilesCount = getAllProfiles().length

  return (
    <div className={styles.tabs}>
      <SpecializationTab
        value={'All'}
        name={'All'}
        count={allProfilesCount || 0}
        color={'#13CBAA'}
        onClick={handleSetSpecialization(
          JobOfferFiltersEnum.specialization,
          '',
        )}
      >
        All
      </SpecializationTab>
      {specializations.map((spec) => {
        const specialization = spec.value as JobSpecialization
        const filteredSpecProfiles = getProfilesBySpecialization(specialization)
        const color = jobSpecializationThemes[specialization]
        return (
          <SpecializationTab
            name={spec.name}
            key={spec.value}
            value={specialization}
            count={filteredSpecProfiles.length || 0}
            color={color}
            onClick={handleSetSpecialization(
              JobOfferFiltersEnum.specialization,
              spec.value,
            )}
          >
            {spec.name}
          </SpecializationTab>
        )
      })}
    </div>
  )
}
