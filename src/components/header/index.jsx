import Link from 'next/link'
import { css } from '../../../styled-system/css'
import 'styled-system/styles.css'

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
        <button className={StyledLanguageButton} href='/'>
          KO
        </button>
        <button className={StyledLanguageButton} href='/'>
          EN
        </button>
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

const StyledHomeButton = css({ color: 'white', fontSize: '3rem' })

const StyledHeaderMenu = css({
  width: '50%',
  height: '100%',
  margin: '0 5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid white',
})

const StyledOption = css({ display: 'flex', flexDirection: 'row', fontSize: '1.5rem', gap: '2rem', color: 'white' })

const StyledHeaderSetting = css({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  margin: '0 5rem',
  gap: '1rem',
  width: '50%',
  height: '100%',
  color: 'white',
})

const StyledLanguageButton = css({ fontSize: '1.5rem' })
