import React from 'react'
import MyProfileHeader from '@/components/MyProfileHeader/MyProfileHeader'

const ProfileLayout = ({
    children,
  }: {
    children: React.ReactNode
  }): JSX.Element  => {

    return (

    <div>
      <MyProfileHeader />
        {children}
    </div>
  )
}

export default ProfileLayout