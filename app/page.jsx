'use client'

import KeyboardParts from '@/parts/Keyboard'
import styled from 'styled-components'

export default function Page() {
  return (
    <>
      <div className='flex items-center h-screen'>
        <div className='w-1/2 h-full'>
          <KeyboardParts className='py-4' />
        </div>
        <div className='mr-4'></div>
      </div>
    </>
  )
}

const StyledWrapper = styled.div``
