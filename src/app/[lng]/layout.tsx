import { cookies } from 'next/headers'
import '../../../index.css'
import Underlay from '../../parts/keyboard/Underlay'
import './styles.css'
import { languages } from '../i18n/settings'
import { dir } from 'i18next'
import { ReactNode } from 'react'

interface RootLayoutProps {
  children: ReactNode
  params: {
    lng: string
  }
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export const metadata = {
  title: 'SoominLab Portfolio',
  description: 'A minimal starter for Nextjs + React-three-fiber and Threejs.',
}

export default async function RootLayout({ children, params: { lng } }: RootLayoutProps) {
  const store = cookies()
  // @ts-ignore
  const themeName = store.get('theme') ? store.get('theme').value : 'dark'
  const theme = themeName

  return (
    <html className='antialiased' data-color-mode={theme} lang={lng} dir={dir(lng)}>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link href='https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap' rel='stylesheet' />
      </head>
      <body style={{ overflow: 'hidden' }}>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <Underlay />
        <div style={{ position: 'relative', width: ' 100%', height: '100%', overflow: 'auto', touchAction: 'auto' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
