import { css } from '../../../styled-system/css'
import Image from 'next/image'
import { motion } from 'framer-motion'
import PageTransition from '../../templates/PageAnimation'
import { SectionProps } from '../types/aboutMe'

const Section05 = ({ t, showSection }: SectionProps) => {
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
    <div className={StyledContainer}>
      <PageTransition transition={showSection}>
        <div className={StyledContents}>
          <div className={StyledInfoWrapper}>
            <motion.div variants={childVariants} className={StyledCategory}>
              ARTICLES
            </motion.div>
            <motion.h1 variants={childVariants} className={StyledTitle}>
              {`ARTICLES`}
            </motion.h1>
            <motion.article variants={childVariants} className={StyledText}>
              {t('Section05Articles')}
            </motion.article>
          </div>
          <div className={StyledLink}>
            <a href='https://soomins.tistory.com/52' target='_blank'>
              {t('Section05Article01')}
            </a>
            <a href='https://soomins.tistory.com/35' target='_blank'>
              {t('Section05Article02')}
            </a>
            <a href='https://soomins.tistory.com/40' target='_blank'>
              {t('Section05Article03')}
            </a>
            <a href='https://soomins.tistory.com/37' target='_blank'>
              {t('Section05Article04')}
            </a>
            <a href='https://soomins.tistory.com/33' target='_blank'>
              {t('Section05Article05')}
            </a>
          </div>
        </div>
      </PageTransition>
    </div>
  )
}
export default Section05

const StyledContainer = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100dvh',

  lg: { width: '100vw' },
  xl: { width: '90vw' },
})

const StyledContents = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',

  lg: { flexDirection: 'column' },
  xl: { flexDirection: 'row-reverse' },
})

const StyledLink = css({
  textAlign: 'left',
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'felxt-start',
  padding: '2rem',
  height: '100%',
  color: 'MainText',
  fontSize: '1rem',
  gap: '1rem',

  '& a': {
    transition: '0.5s',
  },
  '& a:hover': {
    color: 'Orange',
  },

  lg: { width: '100%', padding: '1rem', fontSize: '2rem', textAlign: 'right', justifyContent: 'center' },
  xl: { width: '60%', padding: '5rem', fontSize: '2rem' },
})
const StyledInfoWrapper = css({
  textAlign: 'left',
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '2rem',
  height: '100%',
  color: 'MainText',
  gap: '1rem',
  lg: { width: '100%', textAlign: 'right', padding: '2rem 1rem', height: '100%', justifyContent: 'flex-end' },
  xl: { width: '40%', textAlign: 'left', padding: '5rem', height: '100%', justifyContent: 'center' },
})

const StyledCategory = css({
  fontSize: '1.5rem',
  lineHeight: '0.1rem',
  color: 'MainText',
  right: 0,
})

const StyledTitle = css({
  fontSize: '3rem',
  lineHeight: '100%',
  color: 'MainText',
  lg: { fontSize: '5rem' },
})

const StyledText = css({
  fontSize: '1rem',
  color: 'MainText',
  lg: { fontSize: '1.5rem' },
})
