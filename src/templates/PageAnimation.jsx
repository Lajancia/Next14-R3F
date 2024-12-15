import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { css } from '../../styled-system/css'
const PageTransition = ({ children, transition }) => {
  const router = useRouter()
  const [initialX, setInitialX] = useState(1000)
  const [exitX, setExitX] = useState(0)
  const prevTransition = useRef(transition)

  useEffect(() => {
    if (transition !== prevTransition.current) {
      if (transition) {
        setInitialX(0)
        setExitX(1000)
      } else {
        setInitialX(1000)
        setExitX(0)
      }
      prevTransition.current = transition
    }
  }, [transition])

  return (
    <AnimatePresence wait>
      {transition && (
        <motion.div
          key={router.pathname}
          initial={{ x: initialX, opacity: 0, height: '100%' }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: exitX, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageTransition
