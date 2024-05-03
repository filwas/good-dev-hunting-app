﻿'use client'
import {
  createFiltersObjFromSearchParams,
  createQueryString,
} from '@/app/[locale]/(profile)/profile.helpers'
import {
  hourlyRateOptions,
  mappedEmploymentType,
  mappedSeniorityLevel,
} from '@/app/[locale]/(profile)/profile.mappers'
import {
  JobOfferFiltersEnum,
  type SearchParamsFilters,
} from '@/app/[locale]/(profile)/profile.types'
import { DropdownFilterMulti } from '@/components/Dropdowns/DropdownFilterMulti/DropdownFilterMulti'
import { type DropdownOption } from '@/components/Dropdowns/DropdownOptionItem/DropdownOptionItem'
import { SearchBarWrapper } from '@/components/SearchBar/SearchBarWrapper'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import styles from './Filters.module.scss'

type ProfileFiltersProps = {
  technologies: DropdownOption[]
  countries: DropdownOption[]
}

export const ProfileFilters = ({
  technologies,
  countries,
}: ProfileFiltersProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useMediaQuery()

  const filters: SearchParamsFilters = useMemo(
    () => createFiltersObjFromSearchParams(searchParams),
    [searchParams],
  )

  const handleFilterChange = (
    filterName: JobOfferFiltersEnum,
    value: string,
  ) => {
    const newSearchParams = createQueryString(filterName, value, searchParams)
    //
    router.replace(`${pathname}?${newSearchParams}`)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.features}>
        <DropdownFilterMulti
          text={'Technology'}
          options={technologies}
          jobOfferFilterName={JobOfferFiltersEnum.technology}
          hasSearchInput
          onSearch={handleFilterChange}
          value={filters[JobOfferFiltersEnum.technology]}
        />
        <DropdownFilterMulti
          text={'Seniority'}
          options={mappedSeniorityLevel}
          jobOfferFilterName={JobOfferFiltersEnum.seniority}
          onSearch={handleFilterChange}
          value={filters[JobOfferFiltersEnum.seniority]}
        />
        <DropdownFilterMulti
          text={'Availability'}
          options={mappedEmploymentType}
          jobOfferFilterName={JobOfferFiltersEnum.availability}
          onSearch={handleFilterChange}
          value={filters[JobOfferFiltersEnum.availability]}
        />
        <DropdownFilterMulti
          text={'Location'}
          options={countries}
          jobOfferFilterName={JobOfferFiltersEnum.location}
          onSearch={handleFilterChange}
          value={filters[JobOfferFiltersEnum.location]}
        />
        <DropdownFilterMulti
          text={'Salary'}
          options={hourlyRateOptions}
          jobOfferFilterName={JobOfferFiltersEnum.salary}
          onSearch={handleFilterChange}
          value={filters[JobOfferFiltersEnum.salary]}
        />
      </div>
      {!isMobile && (
        <SearchBarWrapper
          jobOfferFilterName={JobOfferFiltersEnum.search}
          onSearch={handleFilterChange}
          value={filters[JobOfferFiltersEnum.search][0]}
        />
      )}
    </div>
  )
}