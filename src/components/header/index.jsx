'use client'

import Link from 'next/link'
import styled from 'styled-components'

const Header = () => {
  return (
    <StyledHeaderWrapper>
      <StyledHeaderMenu>
        <StyledHomeButton>Soominlab</StyledHomeButton>
        <StyledOption>
          <Link href='/'>About Me</Link>
          <Link href='/'>Gallery</Link>
        </StyledOption>
      </StyledHeaderMenu>
      <StyledHeaderSetting>
        <StyledLanguageButton href='/'>KO</StyledLanguageButton>
        <StyledLanguageButton href='/'>EN</StyledLanguageButton>
      </StyledHeaderSetting>
    </StyledHeaderWrapper>
  )
}

export default Header

const StyledHeaderWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 2rem 0;
  width: 100%;
  height: 10%;
`

const StyledHomeButton = styled.button`
  color: white;
  font-size: 3rem;
`

const StyledHeaderMenu = styled.div`
  width: 50%;
  height: 100%;
  margin: 0 5rem 0 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid white;
`

const StyledOption = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  gap: 2rem;
  color: white;
`

const StyledHeaderSetting = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0 5rem 0 5rem;
  gap: 1rem;
  width: 50%;
  height: 100%;
  color: white;
`
const StyledLanguageButton = styled(Link)`
  font-size: 1.5rem;
`
