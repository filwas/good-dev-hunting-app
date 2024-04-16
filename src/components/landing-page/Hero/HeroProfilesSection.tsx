'use client'
import ProfileCard from '@/app/(profile)/(components)/ProfileCard/ProfileCard'
import { useProfiles } from '@/app/(profile)/(components)/ProfilesProvider'

import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
import { useMemo } from 'react'
import styles from './Hero.module.scss'

export const HeroProfilesSection = () => {
  const { allProfiles } = useProfiles()
  const selectedProfiles = useMemo(() => {
    return allProfiles.sort(() => 0.5 - Math.random()).slice(0, 3)
  }, [allProfiles])

  const [first, second, third] = selectedProfiles

  return (
    <div className={styles.right}>
      <div className={styles.section}>
        {first && (
          <Link href={`${AppRoutes.profile}/${first.githubUsername}`}>
            <div className={styles.frame1}>
              <ProfileCard data={first} />
            </div>
          </Link>
        )}
        {second && (
          <Link href={`${AppRoutes.profile}/${second.githubUsername}`}>
            <div className={styles.frame2}>
              <ProfileCard data={second} />
            </div>
          </Link>
        )}
        {third && (
          <Link href={`${AppRoutes.profile}/${third.githubUsername}`}>
            <div className={styles.frame3}>
              <ProfileCard data={third} />
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
