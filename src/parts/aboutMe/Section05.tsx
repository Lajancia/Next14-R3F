import { css } from '../../../styled-system/css'
import Image from 'next/image'
import { motion } from 'framer-motion'
import PageTransition from '../../templates/PageAnimation'

const Section05 = ({ t, showSection05 }) => {
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
      <PageTransition transition={showSection05}>
        <div className={StyledContents}>
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
  width: '90vw',
  height: '100vh',
})

const StyledContents = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
})

const StyledLink = css({
  textAlign: 'right',
  display: 'flex',
  width: '60%',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '5rem',
  height: '100%',
  color: 'MainText',
  fontSize: '2rem',
  gap: '1rem',

  '& a': {
    transition: '0.5s',
  },
  '& a:hover': {
    color: 'Orange',
  },
})
const StyledInfoWrapper = css({
  textAlign: 'left',
  display: 'flex',
  width: '40%',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '5rem',
  height: '100%',
  color: 'MainText',
  gap: '1rem',
})

const StyledCategory = css({
  fontSize: '1.5rem',
  lineHeight: '0.1rem',
  color: 'MainText',
  right: 0,
})

const StyledTitle = css({
  fontSize: '5rem',
  lineHeight: '100%',
  color: 'MainText',
})

const StyledText = css({
  fontSize: '1.5rem',
  color: 'MainText',
})