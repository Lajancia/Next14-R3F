'use client'
import { useRouter } from 'next/navigation'
import Modal from 'src/components/Dialog'
import { css } from '../../../../../styled-system/css'
import Link from 'next/link'
import Footer from 'src/components/Footer'

export default function Login() {
  const router = useRouter()
  return (
    <Modal>
      <div className={StyledBackground}>
        <div className={StyledWrapper}>
          <a href={'/'}>Home</a>
          <Link href={'/aboutMe'}>About Me</Link>
          <Link href={'/gallery'}>Gallery</Link>
          <button onClick={() => router.back()} className={StyledButton}>
            CLOSE
          </button>
        </div>
      </div>
    </Modal>
  )
}

const StyledButton = css({
  padding: '0.5rem 0.8rem',
  textAlign: 'right',
  fontSize: '1rem',
  color: 'background',
  borderColor: 'MainText',
  border: '2px solid',
  background: 'MainText',

  borderRadius: '0.5rem',
})

const StyledBackground = css({
  width: '100vw',
  height: '100vh',
  backgroundColor: 'orange',
})

const StyledWrapper = css({
  width: '100%',
  height: '95%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  fontSize: '2rem',
  color: 'MainText',
})

const StyledLink = css({})
