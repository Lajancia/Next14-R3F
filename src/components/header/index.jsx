import Link from 'next/link'
import { css } from '../../../styled-system/css'
import '../../../styled-system/styles.css'

const toggleTheme = () => {
  console.log('toggle')
  const currentTheme = document.cookie
    .split('; ')
    .find((row) => row.startsWith('theme='))
    ?.split('=')[1]
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  document.cookie = `theme=${newTheme}; path=/`
  window.document.documentElement.setAttribute('data-color-mode', newTheme)
}

const Header = () => {
  return (
    <div className={StyledHeaderWrapper}>
      <div className={StyledHeaderMenu}>
        <button className={StyledHomeButton}>Soominlab</button>
        <div className={StyledOption}>
          <Link href='/'>About Me</Link>
          <Link href='/'>Gallery</Link>
        </div>
      </div>
      <div className={StyledHeaderSetting}>
        <button className={StyledLanguageButton}>KO</button>
        <button className={StyledLanguageButton}>EN</button>
        <button className={StyledThemeButton} onClick={toggleTheme} />
      </div>
    </div>
  )
}

export default Header

const StyledHeaderWrapper = css({
  position: 'fixed',
  display: 'flex',
  alignItems: ' flex-end',
  justifyContent: 'space-between',
  margin: '2rem 0',
  width: '100%',
  height: '10%',
})

const StyledHomeButton = css({ color: 'MainText', fontSize: '3rem' })

const StyledHeaderMenu = css({
  width: '50%',
  height: '100%',
  margin: '0 5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid',
  borderBottomColor: 'MainText',
})

const StyledOption = css({ display: 'flex', flexDirection: 'row', fontSize: '1.5rem', gap: '2rem', color: 'MainText' })

const StyledHeaderSetting = css({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  margin: '0 5rem',
  gap: '1rem',
  width: '50%',
  height: '100%',
  color: 'MainText',
})

const StyledLanguageButton = css({ fontSize: '1.5rem' })

const StyledThemeButton = css({
  color: 'MainText',
  backgroundColor: 'MainText',
  width: '2rem', // Adjust the size as needed
  height: '2rem', // Adjust the size as needed
  borderRadius: '50%',
  cursor: 'pointer',
})
