'use client'

import { css } from '../../../styled-system/css'
import '../../../styled-system/styles.css'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Cookies from 'js-cookie'
import MobileMenu from '../../parts/menu/MobileMenu'
import useOpenModalStore from '../../utils/state/menuState'
import { useGLTF, useTexture } from '@react-three/drei'
import { FaMoon, FaSun } from 'react-icons/fa'

const toggleTheme = () => {
  if (!Cookies.get('theme')) {
    Cookies.set('theme', 'dark')
  }
  const currentTheme = document.cookie
    .split('; ')
    .find((row) => row.startsWith('theme='))
    ?.split('=')[1]
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  document.cookie = `theme=${newTheme}; path=/`
  window.document.documentElement.setAttribute('data-color-mode', newTheme)
  return newTheme
}

const getCurrentTheme = () =>
  document.documentElement.getAttribute('data-color-mode') ||
  Cookies.get('theme') ||
  'dark'

type HeaderProps = {
  lng: string
  handleClose: () => void
}

type StyledProps = {
  currentPath: boolean | string
}

const Header = ({ lng, handleClose }: HeaderProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [buttonClick, setButtonClick] = useState(false)
  const { openModal } = useOpenModalStore()
  const [currentPath, setCurrentPath] = useState(pathname)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (typeof window === 'undefined' ? 'dark' : getCurrentTheme()) as 'light' | 'dark')

  const handleGalleryMove = () => {
    if (pathname.includes('/gallery')) return
    setButtonClick(true)
    setCurrentPath('/gallery')
    handleClose()
    setTimeout(() => {
      router.push(`/${lng}/gallery`)
      setButtonClick(false)
    }, 800)
  }

  const handleMain = () => {
    if (pathname === '/en' || pathname === '/ko') return
    setButtonClick(true)
    setCurrentPath('/')
    handleClose()
    setTimeout(() => {
      router.push(`/${lng}`)
      setButtonClick(false)
    }, 800)
  }

  const handleAboutMe = () => {
    if (pathname.includes('/aboutMe')) return
    setButtonClick(true)
    setCurrentPath('/aboutMe')
    handleClose()
    setTimeout(() => {
      router.push(`/${lng}/aboutMe`)
      setButtonClick(false)
    }, 800)
  }

  const handleToggleTheme = () => {
    setTheme(toggleTheme() as 'light' | 'dark')
  }

  const handleOpen = () => {
    openModal()
  }

  const preloadCube = useRef(false)
  const handleAboutMeHover = () => {
    if (!preloadCube.current) {
      preloadCube.current = true
      useGLTF.preload('/work.glb')
    }
  }

  const preloadGallery = useRef(false)
  const handleGalleryHover = () => {
    if (!preloadGallery.current) {
      preloadGallery.current = true
      for (let i = 1; i <= 24; i++) {
        useTexture.preload(`/img/gallery/${i}.jpeg`)
      }
    }
  }

  useEffect(() => {
    console.log('pathname', pathname)
    setCurrentPath(pathname)
  }, [])

  return (
    <>
      <MobileMenu />
      <div className={StyledHeaderWrapper}>
        <button onClick={() => handleOpen()} className={StyledMobileMenu}>
          MENU
        </button>
        <div className={StyledHeaderMenu}>
          <button
            disabled={buttonClick}
            className={StyledHomeLink({ currentPath: currentPath })}
            onClick={() => handleMain()}
          >
            Soominlab
          </button>

          <div className={StyledOption}>
            <button
              disabled={buttonClick}
              className={StyledLink({ currentPath: currentPath.includes('/aboutMe') ? true : false })}
              onClick={() => handleAboutMe()}
              onMouseEnter={handleAboutMeHover}
            >
              About Me
            </button>
          </div>
        </div>
        <div className={StyledRightSetting}>
          <button
            disabled={buttonClick}
            onClick={() => handleGalleryMove()}
            onMouseEnter={handleGalleryHover}
            className={StyledLink({ currentPath: currentPath.includes('/gallery') ? true : false })}
          >
            Gallery
          </button>
          <div className={StyledHeaderSetting}>
            <a
              href={`/ko${pathname.replace(/\/(en|ko)/, '')}`}
              className={StyledLanguageButton({ currentPath: pathname.includes('ko') })}
            >
              KO
            </a>
            <a
              href={`/en${pathname.replace(/\/(en|ko)/, '')}`}
              className={StyledLanguageButton({ currentPath: pathname.includes('en') })}
            >
              EN
            </a>
            <button
              className={StyledThemeButton}
              onClick={handleToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header

const StyledMobileMenu = css({
  display: 'flex',
  width: '50%',
  height: '100%',
  padding: '0 1rem 0 1.5rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottomColor: 'MainText',
  fontSize: '1.5rem',
  color: 'MainText',
  lg: { display: 'none' },
})

const StyledLink = (props: StyledProps) =>
  css({
    display: 'none',
    color: props.currentPath ? 'orange' : 'MainText',
    transition: 'color 0.3s',
    '&:hover': { color: 'orange' },

    lg: { display: 'block' },
  })

const StyledHeaderWrapper = css({
  position: 'fixed',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  padding: '2rem 0',
  width: '100%',
  height: '10%',
  backdropFilter: 'blur(6px)',
  lg: { height: '10vh', padding: '3rem 2rem' },
  xl: { height: '20vh', padding: '2rem 2rem' },
})

const StyledHomeLink = (props: StyledProps) =>
  css({
    color: props.currentPath === '/en' || props.currentPath === '/ko' ? 'orange' : 'MainText',
    fontSize: '2rem',
    transition: 'color 0.3s',
    '&:hover': { color: 'orange' },
    lg: {
      fontSize: '2.5rem',
    },
    xl: {
      fontSize: '3rem',
    },
  })

const StyledHeaderMenu = css({
  display: 'none',
  width: '50%',
  height: '100%',
  padding: '0 1rem 0 2.5rem',

  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottomColor: 'MainText',
  lg: { display: 'flex', padding: '0 2.5rem 0 5rem' },
  xl: { display: 'flex' },
})

const StyledOption = css({
  display: 'flex',
  flexDirection: 'row',
  fontSize: '1.5rem',
  gap: '2rem',
  color: 'MainText',
  lg: { gap: '1.5rem' },
  xl: { gap: '2rem' },
})
const StyledHeaderSetting = css({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '1rem',
  color: 'MainText',

  lg: { gap: '1rem' },
  xl: { gap: '1rem' },
})

const StyledLanguageButton = (props: StyledProps) =>
  css({ fontSize: '1.5rem', color: props.currentPath ? 'orange' : 'MainText' })

const StyledThemeButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
  border: '1px solid',
  borderColor: 'MainText',
  color: 'MainText',
  backgroundColor: 'transparent',
  fontSize: '1.1rem',
  cursor: 'pointer',
  transition: 'color 0.3s, border-color 0.3s',
  '&:hover': { color: 'orange', borderColor: 'orange' },
  '& svg': {
    width: '1.1rem',
    height: '1.1rem',
  },
})

const StyledRightSetting = css({
  display: 'flex',
  justifyContent: 'right',
  alignItems: 'center',
  padding: '0 1.5rem 0 1rem',
  width: '100%',
  height: '100%',
  fontSize: '1.5rem',
  gap: '2rem',
  color: 'MainText',
  lg: {
    justifyContent: 'space-between',
    padding: '0 2rem 0 2.5rem',
    width: '50%',
  },
  xl: {
    padding: '0 5rem 0 2.5rem',
    width: '50%',
  },
})
