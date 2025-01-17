'use client'
import Link from 'next/link'
import { css } from '../../../styled-system/css'
import '../../../styled-system/styles.css'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useTranslation } from '../../app/i18n/client'
import { Trans } from 'react-i18next/TransWithoutContext'
import Cookies from 'js-cookie'

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
}

const Header = ({ lng, handleClose }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [buttonClick, setButtonClick] = useState(false)

  const [currentPath, setCurrentPath] = useState(pathname)

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
    if (pathname === '/en' || pathname === 'ko') return
    setButtonClick(true)
    setCurrentPath('/')
    handleClose()
    setTimeout(() => {
      router.push('/')
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

  // const handleKorean = () => {
  //   if (lng === 'en') router.push()
  // }

  // const handleEnglish = () => {
  //   if (lng === 'ko') router.push(`/en${pathname.replace('/ko', '')}`)
  // }

  useEffect(() => {
    console.log('pathname', pathname)
    setCurrentPath(pathname)
  }, [])

  return (
    <div className={StyledHeaderWrapper}>
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
          >
            About Me
          </button>
        </div>
      </div>
      <div className={StyledRightSetting}>
        <button
          disabled={buttonClick}
          onClick={() => handleGalleryMove()}
          className={StyledLink({ currentPath: currentPath.includes('/gallery') ? true : false })}
        >
          Gallery
        </button>
        <div className={StyledHeaderSetting}>
          <a
            href={`/ko${pathname.replace('/en', '')}`}
            className={StyledLanguageButton({ currentPath: pathname.includes('ko') })}
          >
            KO
          </a>
          <a
            href={`/en${pathname.replace('/ko', '')}`}
            className={StyledLanguageButton({ currentPath: pathname.includes('en') })}
          >
            EN
          </a>
          <button className={StyledThemeButton} onClick={toggleTheme} />
        </div>
      </div>
    </div>
  )
}

export default Header

const StyledLink = (props) =>
  css({
    color: props.currentPath ? 'orange' : 'MainText',
    transition: 'color 0.3s',
    '&:hover': { color: 'orange' },
  })

const StyledHeaderWrapper = css({
  position: 'fixed',
  display: 'flex',
  alignItems: ' flex-end',
  justifyContent: 'space-between',
  margin: '2rem 0',
  width: '100%',
  height: '10%',
})

const StyledHomeLink = (props) =>
  css({
    color: props.currentPath === '/en' || props.currentPath === '/ko' ? 'orange' : 'MainText',
    fontSize: '3rem',
    transition: 'color 0.3s',
    '&:hover': { color: 'orange' },
  })

const StyledHeaderMenu = css({
  width: '50%',
  height: '100%',
  padding: '0 2.5rem 0 5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  borderBottomColor: 'MainText',
})

const StyledOption = css({ display: 'flex', flexDirection: 'row', fontSize: '1.5rem', gap: '2rem', color: 'MainText' })
const StyledHeaderSetting = css({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',

  gap: '1rem',
  color: 'MainText',
})

const StyledLanguageButton = (props) => css({ fontSize: '1.5rem', color: props.currentPath ? 'orange' : 'MainText' })

const StyledThemeButton = css({
  color: 'MainText',
  backgroundColor: 'MainText',
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
  cursor: 'pointer',
})

const StyledRightSetting = css({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 5rem 0 2.5rem',
  width: '50%',
  height: '100%',
  fontSize: '1.5rem',
  gap: '2rem',
  color: 'MainText',
})
