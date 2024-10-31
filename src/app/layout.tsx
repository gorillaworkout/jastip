import { getEvents } from '@/data'
import ReduxProvider from '@/features/ReduxProvider'
import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import type React from 'react'
import { ApplicationLayout } from './application-layout'
export const metadata: Metadata = {
  title: {
    template: '%s - Jastip',
    default: 'Jastip',
  },
  description: '',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let events = await getEvents()

  return (
    // <Provider store={store}>
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <ReduxProvider>
        <ApplicationLayout events={events}>
          {/* <ReduxProvider>{children}</ReduxProvider> */}
          {children}
        </ApplicationLayout>

        </ReduxProvider>
      </body>
    </html>
    // </Provider>
  )
}
