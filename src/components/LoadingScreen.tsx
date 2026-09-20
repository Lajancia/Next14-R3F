'use client'

import { motion } from 'framer-motion'
import { css } from '../../styled-system/css'

type LoadingScreenProps = {
  progress: number
  loadingPhase: 'loading' | 'exiting' | 'done'
}

const LoadingScreen = ({ progress, loadingPhase }: LoadingScreenProps) => {
  if (loadingPhase === 'done') return null

  return (
    <motion.div
      className={StyledOverlay}
      initial={{ y: 0 }}
      animate={loadingPhase === 'exiting' ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className={StyledCenter}>
        <span className={StyledTitle}>Soominlab</span>
      </div>

      <div className={StyledProgressArea}>
        <span className={StyledProgressText}>{progress}%</span>
        <div className={StyledProgressTrack}>
          <div
            className={StyledProgressFill}
            style={{ width: `${progress}%` }}
          />
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
  backgroundColor: '#1e1e1e',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#ffffff',
})

const StyledCenter = css({
  textAlign: 'center',
})

const StyledTitle = css({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#ffffff',
  lg: { fontSize: '4rem' },
  xl: { fontSize: '5rem' },
})

const StyledProgressArea = css({
  position: 'absolute',
  bottom: '13%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.4rem',
})

const StyledProgressText = css({
  fontSize: '0.8rem',
  color: 'rgba(255,255,255,0.5)',
  fontVariantNumeric: 'tabular-nums',
})

const StyledProgressTrack = css({
  width: '8rem',
  height: '1px',
  backgroundColor: 'rgba(255,255,255,0.15)',
})

const StyledProgressFill = css({
  height: '100%',
  backgroundColor: 'rgba(255,255,255,0.6)',
  transition: 'width 0.3s ease-out',
})