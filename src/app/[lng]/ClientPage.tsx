'use client'

import dynamic from 'next/dynamic'
import Header from '../../components/Header'
import Info from '../../parts/keyboard/Info'
import { css } from '../../../styled-system/css'
import { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react'
import Footer from '../../components/Footer'
import { useTranslation } from '../i18n/client'
import LoadingScreen from '../../components/LoadingScreen'
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

const BackgroundText = dynamic(() => import('../../parts/keyboard/BackgroundText'), { ssr: false })
const Keyboards = dynamic(() => import('../../parts/keyboard/Keyboard'), { ssr: false })
const Motorcycle = dynamic(() => import('../../parts/keyboard/Bike'), { ssr: false })

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

  // Loading screen state — always start visible (matches SSR)
  const [loadingPhase, setLoadingPhase] = useState<'loading' | 'exiting' | 'done'>('loading')
  const [loadingProgress, setLoadingProgress] = useState(0)
  const loadingDoneRef = useRef(false)
  const typingDoneRef = useRef(false)
  const modelLoadedRef = useRef(false)

  const checkAndTriggerExit = useCallback(() => {
    if (modelLoadedRef.current && typingDoneRef.current && !loadingDoneRef.current) {
      loadingDoneRef.current = true
      sessionStorage.setItem('hermes_loaded', '1')
      setTimeout(() => {
        setLoadingPhase('exiting')
      }, 300)
    }
  }, [])

  const handleTypingComplete = useCallback(() => {
    typingDoneRef.current = true
    checkAndTriggerExit()
  }, [checkAndTriggerExit])

  useLayoutEffect(() => {
    const isFirstVisit = !sessionStorage.getItem('hermes_loaded')

    if (!isFirstVisit) {
      // Already cached — hide loading immediately before paint
      setLoadingPhase('done')
      setLoadingProgress(100)
      setRenderKeyboard(true)  // mount first, effect shows after 100ms
      return
    }

    // First visit — start preloading
    const threshold = 95

    const onProgress = (_url: string, loaded: number, total: number) => {
      const pct = Math.min(Math.round((loaded / total) * 100), 100)
      setLoadingProgress((prev) => Math.max(prev, pct))
    }

    const onLoad = () => {
      modelLoadedRef.current = true
      setLoadingProgress(100)
      checkAndTriggerExit()
    }

    THREE.DefaultLoadingManager.onProgress = onProgress
    THREE.DefaultLoadingManager.onLoad = onLoad

    useGLTF.preload('/keyboard_website.glb')
    useGLTF.preload('/bike.glb')

    const fallback = setTimeout(() => {
      if (loadingProgress < threshold) {
        setLoadingProgress((prev) => Math.max(prev, 90))
      }
    }, 5000)

    const safety = setTimeout(() => {
      if (!loadingDoneRef.current) {
        modelLoadedRef.current = true
        typingDoneRef.current = true
        setLoadingPhase('exiting')
      }
    }, 8000)

    return () => {
      clearTimeout(fallback)
      clearTimeout(safety)
    }
  }, [checkAndTriggerExit])

  useEffect(() => {
    if (loadingPhase === 'exiting') {
      const timer = setTimeout(() => {
        setLoadingPhase('done')
        // Mount first, show after a tick → spring animates 0→scaleSet
        setRenderKeyboard(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [loadingPhase])

  // Mount → delayed show so spring picks up the transition
  useEffect(() => {
    if (!renderKeyboard) return
    const timer = setTimeout(() => {
      setShowKeyboard(true)
      setShowBackground(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [renderKeyboard])

  useEffect(() => {
    if (!renderBike) return
    const timer = setTimeout(() => {
      setShowBike(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [renderBike])

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
      setRenderBike(true)  // effect will showBike=true after 100ms
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
      setRenderKeyboard(true)  // effect will showKeyboard=true after 100ms
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
      <LoadingScreen progress={loadingProgress} loadingPhase={loadingPhase} onTypingComplete={handleTypingComplete} />

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
  bottom: '4rem',
  left: '50%',
  transform: 'translateX(-50%)',
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
  animation: 'bounce',
})

const TextContentStyle = css({
  position: 'absolute',
  width: '100vw',
  height: '100dvh',
  zIndex: 1,
  pointerEvents: 'none',
  lg: { width: '100vw', height: '90dvh' },
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
