'use client'

import Header from '../../../components/Header'
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

  return (
    <>
      <div className={StyledHeaderContainer}>
        <Header lng={lng} handleClose={handleClose} />
      </div>
      {showGallery && (
        <div className={StyledGalleryWrapper}>
          <Gallery />
        </div>
      )}
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