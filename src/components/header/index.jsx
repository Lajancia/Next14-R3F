'use client'
import Link from 'next/link'
import { css } from '../../../styled-system/css'
import '../../../styled-system/styles.css'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const toggleTheme = () => {
  const currentTheme = document.cookie
    .split('; ')
    .find((row) => row.startsWith('theme='))
    ?.split('=')[1]
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  document.cookie = `theme=${newTheme}; path=/`
  window.document.documentElement.setAttribute('data-color-mode', newTheme)
}

const Header = ({ handleClose }) => {
  const router = useRouter()
  const pathname = usePathname()

  const [currentPath, setCurrentPath] = useState(pathname)

  const handleGalleryMove = () => {
    if (pathname === '/gallery') return
    setCurrentPath('/gallery')
    handleClose()
    setTimeout(() => {
      router.push('/gallery')
    }, 800)
  }

  const handleMain = () => {
    if (pathname === '/') return
    setCurrentPath('/')
    handleClose()
    setTimeout(() => {
      router.push('/')
    }, 800)
  }

  const handleAboutMe = () => {
    if (pathname === '/aboutMe') return
    setCurrentPath('/aboutMe')
    handleClose()
    setTimeout(() => {
      router.push('/aboutMe')
    }, 800)
  }

  useEffect(() => {
    console.log('pathname', pathname)
    setCurrentPath(pathname)
  }, [])

  return (
    <div className={StyledHeaderWrapper}>
      <div className={StyledHeaderMenu}>
        <button className={StyledHomeLink({ currentPath: currentPath })} onClick={() => handleMain()}>
          Soominlab
        </button>
        <div className={StyledOption}>
          <button onClick={() => handleAboutMe()}>About Me</button>
        </div>
      </div>
      <div className={StyledRightSetting}>
        <button
          onClick={() => handleGalleryMove()}
          className={StyledLink({ currentPath: currentPath === '/gallery' ? true : false })}
        >
          Gallery
        </button>
        <div className={StyledHeaderSetting}>
          {/* <button className={StyledLanguageButton({ currentPath: false })}>KO</button>
          <button className={StyledLanguageButton({ currentPath: true })}>EN</button> */}
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
    color: props.currentPath === '/' ? 'orange' : 'MainText',
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
