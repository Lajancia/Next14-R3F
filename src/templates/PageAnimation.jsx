import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const PageTransition = ({ children }) => {
  const router = useRouter()
  const [isExiting, setIsExiting] = useState(false)
  const [nextPage, setNextPage] = useState(null)

  const handleExitComplete = () => {
    if (nextPage) {
      router.push(nextPage)
    }
  }

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      setIsExiting(true)
      setNextPage(url)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [router])

  return (
    <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
      <motion.div
        key={router.pathname}
        initial={{ x: isExiting ? 0 : -1000 }}
        animate={{ x: 0 }}
        exit={{ x: 1000 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition
