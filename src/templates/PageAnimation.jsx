import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'

const PageTransition = ({ children, transition }) => {
  const router = useRouter()
  const prevTransition = useRef(transition)

  const parentVariants = {
    hidden: { x: 50, opacity: 0, height: '100%' },
    visible: { x: 0, opacity: 1, height: '100%', transition: { duration: 0.8, staggerChildren: 0.3 } },
    exit: { x: 50, opacity: 0, transition: { duration: 0.8 } },
  }

  useEffect(() => {
    if (transition !== prevTransition.current) {
      prevTransition.current = transition
    }
  }, [transition])

  return (
    <AnimatePresence wait>
      {transition && (
        <motion.div key={router.pathname} initial='hidden' animate='visible' exit='exit' variants={parentVariants}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageTransition
