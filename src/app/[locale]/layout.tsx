import { findUserById } from '@/app/(auth)/_actions'
import AuthProvider from '@/app/(auth)/_providers/Auth.provider'
import { findAllApprovedProfiles } from '@/app/(profile)/_actions'
import { ProfilesProvider } from '@/app/(profile)/_providers/Profiles.provider'
import { auth } from '@/auth'
import { ModalProvider } from '@/contexts/ModalContext'
import { ToastContextProvider } from '@/contexts/ToastContext'
import combineClasses from '@/utils/combineClasses'
import { unstable_setRequestLocale } from 'next-intl/server'
import PlausibleProvider from 'next-plausible'
import { IBM_Plex_Sans, Inter } from 'next/font/google'
import * as process from 'process'
import React from 'react'
import '../globals.scss'

const ibm = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['100', '400', '500'],
  variable: '--font-ibm',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
})

const commonClasses = combineClasses([ibm.variable, inter.variable])

export const metadata = {
  title: 'Good Dev Hunting - find the best developers for your team',
  description:
    "Catch coding legends! Good Dev Hunting is reverse recruitment platform that allows you to find the best developers for your team. Our site provides access to detailed profiles of developers, allowing for a quick match of their skills to your company's needs.",
}

// Can be imported from a shared config
const locales = ['en', 'de', 'pl']

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  const session = await auth()
  const user = session?.user ? await findUserById(session.user.id) : null

  // TODO: We need to store it in some global state management (eg. zustand), and replace provider
  const fetchedProfiles = await findAllApprovedProfiles()

  return (
    <html lang={locale}>
      <body className={commonClasses}>
        <PlausibleProvider
          domain={process.env.NEXT_PUBLIC_APP_ORIGIN_DOMAIN || ''}
        >
          <AuthProvider initialUser={user}>
            <ToastContextProvider>
              <ProfilesProvider initialProfiles={fetchedProfiles}>
                <ModalProvider>{children}</ModalProvider>
              </ProfilesProvider>
            </ToastContextProvider>
          </AuthProvider>
        </PlausibleProvider>
        <div id="portal" />
        <div id="toasts" />
      </body>
    </html>
  )
}
