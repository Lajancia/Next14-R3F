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

type PageProps = {
  params: {
    lng: string
  }
}

export default function Page({ params: { lng } }: PageProps) {
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
    setShowKeyboard(false) // 애니메이션을 위해 즉시 false로 설정

    // 1초 후 컴포넌트를 DOM에서 제거
    unmountTimeoutRef.current = setTimeout(() => {
      setRenderKeyboard(false)
    }, 1000)

    // 1초 후에 모터사이클을 보여줍니다.
    timeoutRef.current = setTimeout(() => {
      setRenderBike(true)
      setShowBike(true)
      setIsTransitioning(false)
    }, 1000)
  }, [isTransitioning, showKeyboard])

  const scrollUp = useCallback(() => {
    if (isTransitioning || !showBike) return
    setIsTransitioning(true)
    setShowBike(false) // 애니메이션을 위해 즉시 false로 설정

    // 1초 후 컴포넌트를 DOM에서 제거
    unmountTimeoutRef.current = setTimeout(() => {
      setRenderBike(false)
    }, 1000)

    // 1초 후에 키보드를 보여줍니다.
    timeoutRef.current = setTimeout(() => {
      setRenderKeyboard(true) // 키보드 컴포넌트를 다시 렌더링
      setShowKeyboard(true) // 키보드를 보여주며 애니메이션 시작
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
    // 데스크톱의 휠 이벤트는 유지합니다.
    node?.addEventListener('wheel', handleWheel)

    return () => {
      node?.removeEventListener('wheel', handleWheel)
    }
  }, [isTransitioning, scrollDown, scrollUp])

  const handleCloseModel = () => {
    // Header의 링크를 클릭했을 때, 현재 보이는 모델을 닫는 애니메이션을 트리거합니다.
    // 페이지를 떠날 때 배경과 푸터도 함께 사라지도록 합니다.
    setShowBackground(false)
    // Bike가 보일 때는 Bike를 닫고, 그렇지 않으면 Keyboard의 상태를 토글합니다.
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
        {/* 스크롤 시 나타나는 두 번째 Info 컴포넌트 */}
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
          {/* Keyboards 컴포넌트는 showKeyboard가 false가 되면 사라집니다. */}
          {/* 각 모델을 absolute wrapper로 감싸 같은 위치에 렌더링되도록 합니다. */}
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
      {/* 모바일 전용 화살표 버튼 */}
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
  // 데스크톱에서는 숨김
  flexDirection: 'column',
  gap: '1rem',
  xl: { display: 'none' },
})

const ArrowButton = css({
  background: 'none',
  border: 'none',
  color: 'MainText',
  fontSize: '2.5rem', // 아이콘 크기를 키워 터치하기 쉽게 만듭니다.
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'transform 0.3s',
  padding: '0.5rem', // 눈에 보이지 않는 클릭 영역을 확보합니다.
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
