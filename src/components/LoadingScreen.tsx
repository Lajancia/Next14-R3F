'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { css } from '../../styled-system/css'

type LoadingScreenProps = {
  progress: number
  loadingPhase: 'loading' | 'exiting' | 'done'
  onTypingComplete?: () => void
}

const LINE_1 = 'My name is Soomin'
const LINE_2 = 'And This is my personal Portfolio Website'

const LoadingScreen = ({ progress, loadingPhase, onTypingComplete }: LoadingScreenProps) => {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')

  useEffect(() => {
    let i = 0
    let j = 0

    const interval1 = setInterval(() => {
      if (i <= LINE_1.length) {
        setText1(LINE_1.slice(0, i))
        i++
      } else {
        clearInterval(interval1)
        const interval2 = setInterval(() => {
          if (j <= LINE_2.length) {
            setText2(LINE_2.slice(0, j))
            j++
          } else {
            clearInterval(interval2)
            onTypingComplete?.()
          }
        }, 40)
      }
    }, 45)

    return () => {
      clearInterval(interval1)
    }
  }, [onTypingComplete])

  if (loadingPhase === 'done') return null

  return (
    <motion.div
      className={StyledOverlay}
      initial={{ y: 0 }}
      animate={loadingPhase === 'exiting' ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 1.0, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className={StyledCenterContainer}>
        <div className={StyledHeroGrid}>
          <div className={StyledLeftCol}>
            <div className={StyledTitleLine}>HELLO!</div>
            <div className={StyledTitleLine}>WELCOME</div>
          </div>

          <div className={StyledRightCol}>
            <div className={StyledSubText}>{text1}</div>
            <div className={StyledSubText}>{text2}</div>
          </div>
        </div>

        <div className={StyledProgressArea}>
          <div className={StyledProgressTrack}>
            <div
              className={StyledProgressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* <span className={StyledProgressText}>{progress}%</span> */}
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen

const StyledOverlay = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100dvh',
  backgroundColor: '#1a1a1a',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#ffffff',
})

const StyledCenterContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '68rem',
  padding: '0 2rem',
  position: 'relative',
})

const StyledHeroGrid = css({
  display: 'grid',
  gridTemplateColumns: '1fr',
  alignItems: 'center',
  width: '100%',
  gap: '2rem',
  textAlign: 'center',
  md: {
    gridTemplateColumns: '1fr 1fr',
    gap: '3rem',
    textAlign: 'left',
  },
})

const StyledLeftCol = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  md: {
    alignItems: 'flex-end',
    paddingRight: '1rem',
  },
})

const StyledTitleLine = css({
  fontSize: '3rem',
  lineHeight: 1.15,
  fontWeight: 'bold',
  letterSpacing: '0.04em',
  color: '#ffffff',
  whiteSpace: 'nowrap',
  sm: { fontSize: '4rem' },
  md: { fontSize: '4.8rem' },
  lg: { fontSize: '5.6rem' },
})

const StyledRightCol = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  minHeight: '3.5rem',
  alignItems: 'center',
  md: {
    alignItems: 'flex-start',
    paddingLeft: '1rem',
  },
})

const StyledSubText = css({
  fontSize: '1rem',
  lineHeight: 1.5,
  letterSpacing: '0.02em',
  color: 'rgba(255,255,255,0.92)',
  whiteSpace: 'pre-wrap',
  sm: { fontSize: '1.2rem' },
  md: { fontSize: '1.35rem' },
})

const StyledProgressArea = css({
  marginTop: '5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  width: '100%',
  maxWidth: '22rem',
  justifyContent: 'center',
})

const StyledProgressTrack = css({
  flex: 1,
  height: '2px',
  backgroundColor: 'rgba(255,255,255,0.2)',
  position: 'relative',
})

const StyledProgressFill = css({
  height: '100%',
  backgroundColor: '#ffffff',
  transition: 'width 0.3s ease-out',
})

const StyledProgressText = css({
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#ffffff',
  minWidth: '3.5rem',
  textAlign: 'right',
  fontVariantNumeric: 'tabular-nums',
})