'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { useState, useEffect } from 'react'
import Gallery from '../../../parts/gallery/Gallery'
import { css } from '../../../../styled-system/css'
import { StyledHeaderContainer } from './styles'

type PageProps = {
  params: {
    lng: string
  }
}

export default function Page({ params: { lng } }: PageProps) {
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    setShowGallery(true)
  }, [])

  const handleClose = () => {
    setShowGallery(!showGallery)
  }

  const slideVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
    exit: { x: 100, opacity: 0, transition: { duration: 0.3 } },
  }

  return (
    <>
      <div className={StyledHeaderContainer}>
        <Header lng={lng} handleClose={handleClose} />
      </div>
      <AnimatePresence>
        {showGallery && (
          <motion.div
            key='gallery'
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={slideVariants}
            className={StyledGalleryWrapper}
          >
            <Gallery />
          </motion.div>
        )}
      </AnimatePresence>
      <div className={StyledFooter}>
        <Footer showFooter={showGallery} />
      </div>
    </>
  )
}

const StyledGalleryWrapper = css({
  width: '100vw',
  height: 'calc(100dvh - 18dvh)',
  position: 'fixed',
  top: '18dvh',
  left: 0,
  lg: { top: '20dvh', height: 'calc(100dvh - 20dvh)' },
})

const StyledFooter = css({
  position: 'fixed',
  bottom: '2rem',
  left: 0,
  right: 0,
  zIndex: 5,
  display: 'flex',
  justifyContent: 'center',
})