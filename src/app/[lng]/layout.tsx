import { cookies } from 'next/headers'
import '../../../index.css'
import Underlay from '../../parts/keyboard/Underlay'
import { Do_Hyeon } from 'next/font/google'
import './styles.css'
import { languages } from '../i18n/settings'
import { dir } from 'i18next'
import { ReactNode } from 'react'

interface RootLayoutProps {
  children: ReactNode
  modal: ReactNode
  params: {
    lng: string
  }
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

const DoHyeon = Do_Hyeon({
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata = {
  title: 'SoominLab Portfolio',
  description: 'A minimal starter for Nextjs + React-three-fiber and Threejs.',
}

export default async function RootLayout({ children, modal, params: { lng } }: RootLayoutProps) {
  const store = cookies()
  // @ts-ignore
  const themeName = store.get('theme') ? store.get('theme').value : 'dark'
  const theme = themeName

  return (
    <html className='antialiased' data-color-mode={theme} lang={lng} dir={dir(lng)}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body style={{ overflow: 'hidden' }} className={DoHyeon.className}>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <Underlay />
        <div style={{ position: 'relative', width: ' 100%', height: '100%', overflow: 'auto', touchAction: 'auto' }}>
          {children}
          {modal}
        </div>
      </body>
    </html>
  )
}
