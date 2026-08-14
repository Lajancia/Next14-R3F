'use client'

import Header from '../../components/Header'
import Info from '../../parts/keyboard/Info'
import { css } from '../../../styled-system/css'
import { useEffect, useState, useRef, useCallback } from 'react'
import BackgroundText from '../../parts/keyboard/BackgroundText'
import Keyboards from '../../parts/keyboard/Keyboard'
import Motorcycle from '../../parts/keyboard/Bike'
import Footer from '../../components/Footer'
import { useTranslation } from '../i18n/client'
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa'

export default function ClientPage({ lng }: { lng: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { t } = useTranslation(lng, 'home')
  const [showKeyboard, setShowKeyboard] = useState(false)
  const [renderKeyboard, setRenderKeyboard] = useState(false)
  const [showBike, setShowBike] = useState(false)
  const [renderBike, setRenderBike] = useState(false)
  const [showBackground, setShowBackground] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const unmountTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setShowKeyboard(true)
    setShowBackground(true)
    setRenderKeyboard(true)
  }, [])

  // 컴포넌트가 언마운트될 때 타임아웃을 정리합니다.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (unmountTimeoutRef.current) {
        clearTimeout(unmountTimeoutRef.current)
      }
    }
  }, [])

  const scrollDown = useCallback(() => {
    if (isTransitioning || !showKeyboard) return
    setIsTransitioning(true)
    setShowKeyboard(false)

    unmountTimeoutRef.current = setTimeout(() => {
      setRenderKeyboard(false)
    }, 1000)

    timeoutRef.current = setTimeout(() => {
      setRenderBike(true)
      setShowBike(true)
      setIsTransitioning(false)
    }, 1000)
  }, [isTransitioning, showKeyboard])

  const scrollUp = useCallback(() => {
    if (isTransitioning || !showBike) return
    setIsTransitioning(true)
    setShowBike(false)

    unmountTimeoutRef.current = setTimeout(() => {
      setRenderBike(false)
    }, 1000)

    timeoutRef.current = setTimeout(() => {
      setRenderKeyboard(true)
      setShowKeyboard(true)
      setIsTransitioning(false)
    }, 1000)
  }, [isTransitioning, showBike])

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        scrollDown()
      } else if (event.deltaY < 0) {
        scrollUp()
      }
    }

    const node = ref.current
    node?.addEventListener('wheel', handleWheel)

    return () => {
      node?.removeEventListener('wheel', handleWheel)
    }
  }, [isTransitioning, scrollDown, scrollUp])

  const handleCloseModel = () => {
    setShowBackground(false)
    if (showBike) {
      setShowBike(false)
    } else {
      setShowKeyboard(false)
    }
  }

  return (
    <>
      <div className={HeaderContainer}>
        <Header lng={lng} handleClose={handleCloseModel} />
      </div>

      <div className={TextContentStyle}>
        <Info
          showKeyboard={showKeyboard}
          number='01'
          category='Modern Art'
          title='MACRO KEYBOARD'
          description={t('mainExplanation')}
          colors={['#ffffff', 'orange', '#000000']}
        />
        {renderBike && (
          <Info
            showKeyboard={showBike}
            number='02'
            category='Mechanical Art'
            title='MOTORCYCLE'
            description={t('SecondExplanation')}
            colors={['#ffffff', '#F54927', '#000000']}
          />
        )}
      </div>

      <div ref={ref} className={containerStyles}>
        <BackgroundText showKeyboard={showBackground} />
        <div className={StyledKeyboard}>
          {renderKeyboard && (
            <div className={ModelWrapper}>
              <Keyboards showKeyboard={showKeyboard} scaleSet={0.35} />
            </div>
          )}
          {renderBike && (
            <div className={ModelWrapper}>
              <Motorcycle showBike={showBike} scaleSet={1.2} />
            </div>
          )}
        </div>
      </div>
      <div className={MobileNavContainer}>
        {(renderKeyboard || renderBike) && (
          <button
            onClick={renderKeyboard ? scrollDown : scrollUp}
            className={ArrowButton}
            aria-label={renderKeyboard ? 'Scroll Down' : 'Scroll Up'}
            disabled={isTransitioning}
          >
            {renderKeyboard ? <FaAngleDoubleDown /> : <FaAngleDoubleUp />}
          </button>
        )}
      </div>
      <div className={StyledFooter}>
        <Footer showFooter={showBackground} />
      </div>
    </>
  )
}

const HeaderContainer = css({
  position: 'absolute',
  zIndex: 10,
  width: '100%',
  height: '20vh',
})

const MobileNavContainer = css({
  display: 'block',
  position: 'fixed',
  bottom: '12vh',
  right: '2rem',
  zIndex: 20,
  flexDirection: 'column',
  gap: '1rem',
  xl: { display: 'none' },
})

const ArrowButton = css({
  background: 'none',
  border: 'none',
  color: 'MainText',
  fontSize: '2.5rem',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'transform 0.3s',
  padding: '0.5rem',
})

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
  position: 'relative',
  width: '100%',
  height: '70%',
  lg: { width: '100%', height: '80%' },
  xl: { width: '100%', height: '100%' },
})

const ModelWrapper = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
})