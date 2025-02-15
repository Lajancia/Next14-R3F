'use client'

import Header from '../../components/Header'
import Info from '../../parts/keyboard/Info'
import { css } from '../../../styled-system/css'
import { useEffect, useState, useRef } from 'react'
import BackgroundText from '../../parts/keyboard/BackgroundText'
import Keyboards from '../../parts/keyboard/Keyboard'
import Footer from '../../components/Footer'
import { useTranslation } from '../i18n/client'

type PageProps = {
  params: {
    lng: string
  }
}

export default function Page({ params: { lng } }: PageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { t } = useTranslation(lng, 'home')
  const [showKeyboard, setShowKeyboard] = useState(false)

  useEffect(() => {
    setShowKeyboard(true)
  }, [])

  const handleCloseKeyboard = () => {
    setShowKeyboard(!showKeyboard)
  }

  return (
    <>
      <div className={HeaderContainer}>
        <Header lng={lng} handleClose={handleCloseKeyboard} />
      </div>
      <div className={TextContentStyle}>
        <Info t={t} showKeyboard={showKeyboard} />
      </div>
      <div ref={ref} className={containerStyles}>
        <BackgroundText showKeyboard={showKeyboard} />
        <div className={StyledKeyboard}>
          <Keyboards showKeyboard={showKeyboard} scaleSet={0.35} />
        </div>
      </div>
      <div className={StyledFooter}>
        <Footer showFooter={showKeyboard} />
      </div>
    </>
  )
}

const HeaderContainer = css({ position: 'absolute', zIndex: 10, width: '100%', height: '20vh' })

const TextContentStyle = css({
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  zIndex: 1,
  pointerEvents: 'none',
  lg: { width: '100vw' },
  xl: { width: '50vw' },
})
const containerStyles = css({
  width: '100vw',
  height: '100vh',
  zIndex: 0,
})

const StyledFooter = css({
  overflow: 'hidden',
  zIndex: 1,
  position: 'absolute',
  bottom: 0,
  height: '10vh',

  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center',
  width: '100%',

  lg: { display: 'flex' },
})

const StyledKeyboard = css({
  width: '100%',
  height: '70%',
  lg: { width: '100%', height: '80%' },
  xl: { width: '100%', height: '100%' },
})
