'use client'
import { ChangeEvent, useState } from 'react'
import { Button } from '../Button/Button'
import { SearchSuggestionItem } from './SearchSuggestionItem'
import { ProfileModel } from '@/data/frontend/profile/types'
import { useModerationFilter } from '@/contexts/ModerationFilterContext'

import styles from './SearchWrapper.module.scss'

type Props = {
  profiles: ProfileModel[]
}

export default function SearchWrapper({ profiles = [] }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const { setEmailSearchValue, setActiveTab } = useModerationFilter()
  const [showSuggestions, setShowSuggestions] = useState(false)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const searchHandler = () => {
    if (searchValue === '') return
    setEmailSearchValue(searchValue)
    setActiveTab(null)
    setSearchValue('')
  }

  const handleSuggestionClick = (term: string) => {
    setShowSuggestions(false)
    setEmailSearchValue(term)
    setSearchValue('')
  }

  const filteredProfiles = profiles.filter((profile) => {
    return searchValue !== '' && profile.userEmail.includes(searchValue)
  })

  return (
    <div className={styles.searchWrapper}>
      <input
        name="searchValue"
        className={styles.searchInput}
        placeholder="eg. richard@gmail.com"
        onChange={changeHandler}
        value={searchValue}
        onFocus={() => setShowSuggestions(true)}
      />
      <Button variant={'action'} onClick={searchHandler}>
        Search
      </Button>
      {showSuggestions && filteredProfiles.length > 0 && (
        <ul className={styles.suggestionsBox}>
          {filteredProfiles.map((profile) => (
            <SearchSuggestionItem
              key={profile.id}
              searchValue={searchValue}
              onClick={handleSuggestionClick}
              profile={profile}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
