import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useEffect, ReactNode, useRef } from 'react'

type PageAnimationProps = {
  children: ReactNode
  transition: boolean
  parentVariant?: any
}

const parentVariants = {
  hidden: { x: -50, y: 0, opacity: 0, height: '100%' },
  visible: { x: 0, y: 0, opacity: 1, height: '100%', transition: { duration: 0.8, staggerChildren: 0.3 } },
  exit: { x: -50, y: 0, opacity: 0, transition: { duration: 0.8 } },
}

const PageTransition: React.FC<PageAnimationProps> = ({ children, transition, parentVariant = parentVariants }) => {
  const router = useRouter()
  const prevTransition = useRef(transition)

  useEffect(() => {
    if (transition !== prevTransition.current) {
      prevTransition.current = transition
    }
  }, [transition])

  return (
    // @ts-ignore
    <AnimatePresence wait>
      {transition && (
        // @ts-ignore
        <motion.div key={router.pathname} initial='hidden' animate='visible' exit='exit' variants={parentVariant}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageTransition
