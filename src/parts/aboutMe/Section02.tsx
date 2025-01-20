import { css } from '../../../styled-system/css'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../../templates/PageAnimation'

const Section01 = ({ t, showSection02 }) => {
  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 2 } },
    exit: { opacity: 0, transition: { duration: 0.8 } },
  }
  const childVariantsLine = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: '100%', y: 0, opacity: 1, transition: { duration: 1, delay: 1 } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.8 } },
  }

  const childInfo = {
    hidden: { x: -50, y: 0, opacity: 0, height: '100%' },
    visible: { x: 0, y: 0, opacity: 1, height: '100%', transition: { duration: 0.8 } },
    exit: { x: -50, y: 0, opacity: 0, transition: { duration: 0.8 } },
  }
  return (
    <div className={StyledInfoWrapper}>
      <AnimatePresence>
        <PageTransition transition={showSection02}>
          <motion.div variants={childVariants} className={StyledCategory}>
            My Journey as a Developer
          </motion.div>
          <motion.h1 variants={childVariants} className={StyledTitle}>
            WORK EXPERIENCE
          </motion.h1>
          <div className={StyledWorkLineContainer}>
            <div className={StyledLeft}>
              <motion.div className={StyledWorkDate} variants={childInfo}>
                2024.06 ~ 2025.01
              </motion.div>
              <motion.div className={StyledWork} variants={childInfo}>
                <div className={StyledPosition}>Associate Research Engineer</div>
                <div className={StyledCompany}>YURA R&D Center</div>
                <ul className={StyledUL}>
                  <li className={StyledLI}>{t('Section02Work02Detail01')}</li>
                  <li className={StyledLI}>{t('Section02Work02Detail02')}</li>
                </ul>
              </motion.div>
              <motion.div className={StyledWorkDate} variants={childInfo}>
                2021.11 ~ 2022.05
              </motion.div>
            </div>

            <motion.div className={StyledLine} variants={childVariantsLine} />
            <div className={StyledRight}>
              <motion.div className={StyledWork} variants={childInfo}>
                <div className={StyledMobile}>2024.06 ~ 2025.01</div>
                <div className={StyledPosition}>Frontend Developer</div>
                <div className={StyledCompany}>Illmuminarean</div>
                <ul className={StyledUL}>
                  <li className={StyledLI}>{t('Section02Work01Detail01')}</li>
                  <li className={StyledLI}>{t('Section02Work01Detail02')}</li>
                  <li className={StyledLI}>{t('Section02Work01Detail03')}</li>
                </ul>
              </motion.div>
              <motion.div className={StyledWork} variants={childInfo}>
                2022.10 ~ 2024.05
                <motion.div className={StyledMobile} variants={childInfo}>
                  <div className={StyledPosition}>Associate Research Engineer</div>
                  <div className={StyledCompany}>YURA R&D Center</div>
                  <ul className={StyledUL}>
                    <li className={StyledLI}>{t('Section02Work02Detail01')}</li>
                    <li className={StyledLI}>{t('Section02Work02Detail02')}</li>
                  </ul>
                </motion.div>
              </motion.div>
              <motion.div className={StyledWork} variants={childInfo}>
                <div className={StyledMobile}>2021.11 ~ 2022.05</div>
                <div className={StyledPosition}>Web Developer</div>
                <div className={StyledCompany}>CommON SRL</div>

                <ul className={StyledUL}>
                  <li className={StyledLI}>{t('Section03Work01Detail01')}</li>
                  <li className={StyledLI}> {t('Section03Work01Detail02')}</li>
                  <li className={StyledLI}> {t('Section03Work01Detail03')}</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </PageTransition>
      </AnimatePresence>
    </div>
  )
}
export default Section01

const StyledMobile = css({
  display: 'block',

  lg: { display: 'none' },
})
const StyledUL = css({
  listStyleType: 'decimal',
})

const StyledLI = css({
  listStylePosition: 'inside',
})

const StyledWorkDate = css({
  display: 'none',
  textAlign: 'right',
  marginTop: '1rem',
  height: '100%',
  lg: { display: 'block' },
})

const StyledInfoWrapper = css({
  textAlign: 'center',
  width: '100%',
  padding: '2rem',
  height: '60rem',
  color: 'white',
  gap: '1rem',
  marginTop: '10vh',
  lg: { padding: '5rem' },
})
const StyledPosition = css({
  fontSize: '1rem',
})

const StyledCompany = css({
  fontSize: '2.5rem',
  lineHeight: '1.5rem',
  paddingBottom: '1rem',
})

const StyledLeft = css({
  display: 'none',
  flexDirection: 'column',
  justifyContent: 'center',
  marginRight: '1rem',
  marginTop: ' 3rem',
  width: '35rem',
  color: 'MainText',
  textAlign: 'right',

  lg: { display: 'flex' },
})

const StyledRight = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginLeft: '1rem',
  marginTop: ' 1rem',
  width: '35rem',
  color: 'MainText',
  textAlign: 'left',
  lg: { marginTop: ' 3rem' },
})

const StyledWork = css({
  height: 'auto',
  marginBottom: '1rem',
  textAlign: 'left',
  padding: '1rem',

  lg: { height: '30%' },
})

const StyledCategory = css({
  fontSize: '1rem',
  lineHeight: '1rem',
  color: 'MainText',
  lg: { fontSize: '1.2rem' },
})

const StyledTitle = css({
  fontSize: '3rem',
  lineHeight: '100%',
  color: 'MainText',
  paddingBottom: '2rem',

  lg: { fontSize: '5rem', paddingBottom: '0' },
})

const StyledWorkLineContainer = css({
  margin: 0,
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
})

const StyledLine = css({
  width: '2px',
  backgroundColor: 'MainText',
  position: 'relative',
  height: '100%',
})
