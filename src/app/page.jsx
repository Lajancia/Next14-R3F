'use client'

import KeyboardParts from '@/parts/keyboard/Keyboard'
import styled from 'styled-components'
import Header from '@/components/header'
import Info from '@/parts/keyboard/Info'

export default function Page() {
  return (
    <>
      <Header />
      <FlexContainer>
        <HalfWidthContainer>
          <KeyboardParts />
        </HalfWidthContainer>

        <HalfWidthContainer>
          <Info />
        </HalfWidthContainer>
      </FlexContainer>
    </>
  )
}

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`
const HalfWidthContainer = styled.div`
  width: 50%;
  height: 100%;
`
const Spacer = styled.div`
  margin-right: 1rem;
`
