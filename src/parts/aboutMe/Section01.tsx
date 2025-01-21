import { css } from '../../../styled-system/css'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../../templates/PageAnimation'
import { SectionProps } from '../types/aboutMe'

const Section01 = ({ t, showSection }: SectionProps) => {
  const childVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
    exit: { x: 50, opacity: 0, transition: { duration: 0.8 } },
  }
  const childVariantsButton = {
    hidden: { x: 0, y: 50, opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1, transition: { duration: 0.8 } },
    exit: { x: 50, opacity: 0, transition: { duration: 0.8 } },
  }

  return (
    <div className={StyledInfoWrapper}>
      <div>
        <AnimatePresence>
          <PageTransition transition={showSection}>
            <motion.div variants={childVariants} className={StyledCategory}>
              INTRODUCTION
            </motion.div>
            <motion.h1 variants={childVariants} className={StyledTitle}>
              {`Welcome!`}
              <br />
              {`I'm Soomin Hwang`}
            </motion.h1>
            <motion.article variants={childVariants} className={StyledText}>
              {t('Section01explanation')}
            </motion.article>
          </PageTransition>
        </AnimatePresence>
      </div>
    </div>
  )
}
export default Section01

const StyledInfoWrapper = css({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2.5rem',
  height: '100vh',
  color: 'white',
  gap: '1rem',

  lg: { width: '60%', padding: '5rem 5rem' },
  xl: { width: '60%', padding: '5rem' },
})

const StyledCategory = css({
  fontSize: '1rem',
  lineHeight: '1rem',
  color: 'MainText',
  lg: { fontSize: '1.5rem' },
})

const StyledTitle = css({
  fontSize: '2rem',
  lineHeight: '100%',
  color: 'MainText',
  lg: { fontSize: '4rem' },
  xl: { fontSize: '5rem' },
})

const StyledText = css({
  fontSize: '1rem',
  color: 'MainText',
  lg: { fontSize: '1.1rem' },
})
