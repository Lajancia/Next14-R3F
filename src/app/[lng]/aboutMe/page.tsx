'use client'

import { Suspense, useRef, useState, useEffect } from 'react'
import { css } from '../../../../styled-system/css'
import Header from '../../../components/Header'
import Section01 from '../../../parts/aboutMe/Section01'
import Section02 from '../../../parts/aboutMe/Section02'
import Section03 from '../../../parts/aboutMe/Section03'
import Section04 from '../../../parts/aboutMe/Section04'
import AboutMeCube from '../../../parts/aboutMe/AboutMeCube'
import Section05 from '../../../parts/aboutMe/Section05'
import { useTranslation } from '../../i18n/client'

type PageProps = {
  params: {
    lng: string
  }
}

export default function Page({ params: { lng } }: PageProps) {
  const { t } = useTranslation(lng, 'aboutMe')
  const ref = useRef<HTMLDivElement>(null)
  const sectionRefs = {
    section01: useRef(null),
    section02: useRef(null),
    section03: useRef(null),
    section04: useRef(null),
    section05: useRef(null),
  }
  const [visibleSections, setVisibleSections] = useState({
    section01: false,
    section02: false,
    section03: false,
    section04: false,
    section05: false,
  })
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // @ts-ignore
            setVisibleSections((prev) => ({ ...prev, [entry.target.dataset.section]: true }))
          }
        })
      },
      { threshold: 0.5 },
    )
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })
    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])
  const [showCube, setShowCube] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShowCube(true)
    }, 100)

    return () => {
      setShowCube(false)
    }
  }, [])

  const handleCloseKeyboard = () => {
    setShowCube(!showCube)
  }

  return (
    <>
      <div className={HeaderContainer}>
        <Header lng={lng} handleClose={handleCloseKeyboard} />
      </div>
      <div className={TextContentStyle}>
        <section ref={sectionRefs.section01} data-section='section01'>
          <Section01 t={t} showSection={visibleSections.section01 && showCube} />
        </section>
        <section ref={sectionRefs.section02} data-section='section02'>
          <Section02 t={t} showSection={visibleSections.section02 && showCube} />
        </section>

        <Section03 t={t} showSection={showCube} />

        <section ref={sectionRefs.section04} data-section='section04'>
          <Section04 t={t} showSection={visibleSections.section04 && showCube} />
        </section>
        <section ref={sectionRefs.section05} data-section='section05'>
          <Section05 t={t} showSection={visibleSections.section05 && showCube} />
        </section>
      </div>
      <div ref={ref} className={containerStyles}>
        <AboutMeCube showCube={showCube} />
      </div>
    </>
  )
}
const TextContentStyle = css({
  position: 'absolute',
  width: '100%',
  height: '100vh',
  zIndex: 1,
})
const containerStyles = css({
  position: 'relative',
  width: '100%',
  height: '100%',
})

const HeaderContainer = css({ position: 'absolute', zIndex: 10, width: '100%', height: '20vh', overflow: 'auto' })
