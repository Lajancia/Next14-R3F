'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { css } from '../../styled-system/css'

type LoadingScreenProps = {
  progress: number
  isLoading: boolean
}

const LoadingScreen = ({ progress, isLoading }: LoadingScreenProps) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={StyledOverlay}
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className={StyledCenter}>
            <span className={StyledTitle}>Soominlab</span>
          </div>

          <div className={StyledProgressArea}>
            <div className={StyledProgressTrack}>
              <motion.div
                className={StyledProgressFill}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
            <span className={StyledProgressText}>{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen

const StyledOverlay = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100dvh',
  backgroundColor: '#0a0a0a',
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
  bottom: '12%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '80%',
  maxWidth: '30rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
})

const StyledProgressTrack = css({
  width: '100%',
  height: '2px',
  backgroundColor: 'rgba(255,255,255,0.2)',
  borderRadius: '1px',
  overflow: 'hidden',
})

const StyledProgressFill = css({
  height: '100%',
  backgroundColor: '#ffffff',
  borderRadius: '1px',
})

const StyledProgressText = css({
  fontSize: '0.875rem',
  color: 'rgba(255,255,255,0.6)',
  fontVariantNumeric: 'tabular-nums',
})