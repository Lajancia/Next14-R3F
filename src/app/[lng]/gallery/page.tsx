'use client'

import InfrastructureDiagram, { NodeInfo } from '../../../parts/infrastructure/InfrastructureDiagram'
import Header from '../../../components/Header'
import { useState, useEffect, useMemo } from 'react'
import PageTransition from '../../../templates/PageAnimation'
import Footer from '../../../components/Footer'
import { useTranslation } from '../../i18n/client'
import { css } from '../../../../styled-system/css'
import { StyledHeaderContainer, StyledFlexContainer, StyledFooter } from './styles'

type PageProps = {
  params: {
    lng: string
  }
}

export default function Page({ params: { lng } }: PageProps) {
  const { t } = useTranslation(lng, 'gallery')
  const [showGallery, setShowGallery] = useState(false)

  useEffect(() => {
    setShowGallery(true)
  }, [])

  const handleCloseGallery = () => {
    setShowGallery(!showGallery)
  }

  const nodes = useMemo<NodeInfo[]>(
    () => [
      { id: 'user', label: 'User', subtitle: 'Browser', title: t('user.title'), desc: t('user.desc') },
      {
        id: 'nginx',
        label: 'Nginx',
        subtitle: 'Proxy + SSL',
        title: t('nginx.title'),
        desc: t('nginx.desc'),
      },
      {
        id: 'nextjs',
        label: 'Next.js 14',
        subtitle: 'R3F Portfolio',
        title: t('nextjs.title'),
        desc: t('nextjs.desc'),
      },
      {
        id: 'k3s',
        label: 'k3s',
        subtitle: 'K8s + ArgoCD',
        title: t('k3s.title'),
        desc: t('k3s.desc'),
      },
      {
        id: 'jenkins',
        label: 'Jenkins',
        subtitle: 'CI Pipeline',
        title: t('jenkins.title'),
        desc: t('jenkins.desc'),
      },
      {
        id: 'github',
        label: 'GitHub',
        subtitle: 'Source + GHCR',
        title: t('github.title'),
        desc: t('github.desc'),
      },
      {
        id: 'tailscale',
        label: 'Tailscale',
        subtitle: 'Secure VPN',
        title: t('tailscale.title'),
        desc: t('tailscale.desc'),
      },
    ],
    [t],
  )

  return (
    <>
      <div className={StyledHeaderContainer}>
        <Header lng={lng} handleClose={handleCloseGallery} />
      </div>
      <div className={StyledTitleContainer}>
        <PageTransition transition={showGallery}>
          <h1 className={StyledTitle}>{t('title')}</h1>
          <p className={StyledSubtitle}>{t('subtitle')}</p>
        </PageTransition>
      </div>
      <div className={StyledFlexContainer}>
        <PageTransition transition={showGallery}>
          <InfrastructureDiagram nodes={nodes} hint={t('hint')} />
        </PageTransition>
      </div>
      <div className={StyledFooter}>
        <Footer showFooter={showGallery} />
      </div>
    </>
  )
}

const StyledTitleContainer = css({
  position: 'absolute',
  top: '9dvh',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 5,
  textAlign: 'center',
  pointerEvents: 'none',
  width: '100%',
  lg: { top: '18dvh' },
  xl: { top: '20dvh' },
})

const StyledTitle = css({
  fontSize: '1.5rem',
  color: 'MainText',
  margin: 0,
  lg: { fontSize: '2rem' },
  xl: { fontSize: '2.5rem' },
})

const StyledSubtitle = css({
  fontSize: '0.8rem',
  color: 'orange',
  margin: 0,
  marginTop: '0.25rem',
  lg: { fontSize: '1rem' },
})
