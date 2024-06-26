import FAQSection from '@/components/landing-page/FAQSection/FAQSection'
import Hero from '@/components/landing-page/Hero/Hero'
import HowItWorks from '@/components/landing-page/HowItWorks/HowItWorks'
import LandingFooter from '@/components/landing-page/LandingFooter/LandingFooter'
import MeetTeam from '@/components/landing-page/MeetTeam/MeetTeam'
import TalentSection from '@/components/landing-page/TalentSection/TalentSection'
import UseYourProfile from '@/components/landing-page/UseYourProfile/UseYourProfile'
import { Container } from '@gdh/ui-system'
import React from 'react'
import styles from '../page.module.scss'
import Header from './(profile)/(components)/Header/Header'

const Page: React.FC = () => {
  return (
    <main className={styles.landing_background}>
      <Header buttonsVariant={'main'} />
      <Container>
        <Hero />
        <HowItWorks />
        <UseYourProfile />
        <MeetTeam />
        <TalentSection />
        <FAQSection />
      </Container>
      <LandingFooter />
    </main>
  )
}

export default Page
