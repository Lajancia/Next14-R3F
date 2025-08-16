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
  const [showSecondInfo, setShowSecondInfo] = useState(false)

  useEffect(() => {
    setShowKeyboard(true)
  }, [])

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // 스크롤 다운 시 키보드 뷰에서 두 번째 정보 뷰로 전환
      if (event.deltaY > 0 && showKeyboard) {
        setShowKeyboard(false)
        setShowSecondInfo(true)
      }
      // 스크롤 업 시 두 번째 정보 뷰에서 키보드 뷰로 전환
      if (event.deltaY < 0 && showSecondInfo) {
        setShowKeyboard(true)
        setShowSecondInfo(false)
      }
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [showKeyboard, showSecondInfo])

  const handleCloseKeyboard = () => {
    setShowKeyboard(!showKeyboard)
  }

  return (
    <>
      <div className={HeaderContainer}>
        <Header lng={lng} handleClose={handleCloseKeyboard} />
      </div>
      <div className={TextContentStyle}>
        <Info
          showKeyboard={showKeyboard}
          number='01'
          category='Modern Art'
          title='MACRO KEYBOARD'
          description={t('mainExplanation')}
        />
        {/* 스크롤 시 나타나는 두 번째 Info 컴포넌트 */}
        {showSecondInfo && (
          <Info
            showKeyboard={showSecondInfo}
            number='02'
            category='Mechanical Art'
            title='MOTORCYCLE'
            description={t('mainExplanation')}
          />
        )}
      </div>

      <div ref={ref} className={containerStyles}>
        <BackgroundText showKeyboard={showKeyboard || showSecondInfo} />
        <div className={StyledKeyboard}>
          {/* Keyboards 컴포넌트는 showKeyboard가 false가 되면 사라집니다. */}
          <Keyboards showKeyboard={showKeyboard} scaleSet={0.35} />
        </div>
      </div>

      <div className={StyledFooter}>
        <Footer showFooter={showKeyboard || showSecondInfo} />
      </div>
    </>
  )
}

const HeaderContainer = css({ position: 'absolute', zIndex: 10, width: '100%', height: '20vh' })

const TextContentStyle = css({
  position: 'absolute',
  width: '100vw',
  height: '100dvh',
  zIndex: 1,
  pointerEvents: 'none',
  lg: { width: '100vw' },
  xl: { width: '50vw' },
})
const containerStyles = css({
  width: '100vw',
  height: '100dvh',
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
