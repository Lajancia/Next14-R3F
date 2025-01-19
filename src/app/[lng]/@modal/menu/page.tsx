'use client'
import { useRouter } from 'next/navigation'
import Modal from 'src/components/Dialog'
import { css } from '../../../../../styled-system/css'
export default function Login() {
  const router = useRouter()
  return (
    <Modal>
      <div className={StyledBackground}>
        <button onClick={() => router.back()}>Close modal</button>
        <h1>Login</h1>
        ...
      </div>
    </Modal>
  )
}

const StyledBackground = css({
  width: '100vw',
  height: '100vh',
  backgroundColor: 'orange',
})
