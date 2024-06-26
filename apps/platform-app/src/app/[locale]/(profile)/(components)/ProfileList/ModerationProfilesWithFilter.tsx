'use client'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { useModeration } from '@/app/[locale]/(profile)/_providers/Moderation.provider'
import { SearchResultsInfo } from '@/components/SearchResultsInfo/SearchResultsInfo'
import useTabCounter from '@/hooks/useTabCounter'
import { AppRoutes } from '@/utils/routes'
import { PublishingState } from '@prisma/client'
import ProfileCard from '../ProfileCard/ProfileCard'
import styles from './ProfileList.module.scss'

export default function ModerationProfilesWithFilters() {
  const {
    publishingStateFilter,
    setPendingStateCounter,
    searchEmailValue,
    profiles,
  } = useModeration()

  const filteredProfiles = profiles.filter((profile: ProfileModel) => {
    if (searchEmailValue) {
      return profile.email.includes(searchEmailValue)
    }
    return profile.state === publishingStateFilter
  })

  const hasResults = filteredProfiles.length > 0

  useTabCounter(profiles, PublishingState.PENDING, setPendingStateCounter)

  return (
    <div className={styles.moderationProfiles}>
      {searchEmailValue &&
        (hasResults ? (
          <SearchResultsInfo
            resultsQty={filteredProfiles.length}
            text="Search results for"
            hasResults
          />
        ) : (
          <SearchResultsInfo text="No search results for" />
        ))}

      <div className={hasResults ? styles.profileListCont : styles.noProfiles}>
        {hasResults ? (
          filteredProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              data={profile}
              href={`${AppRoutes.moderationProfile}/${profile.userId}`}
              withStateStatus
            />
          ))
        ) : (
          <p>No profiles found</p>
        )}
      </div>
    </div>
  )
}
