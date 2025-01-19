import { css } from '../../../styled-system/css'
import { motion } from 'framer-motion'
import PageTransition from '../../templates/PageAnimation'

const Section04 = ({ t, showSection04 }) => {
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
      <PageTransition transition={showSection04}>
        <motion.div variants={childVariants} className={StyledCategory}>
          Career Profile 2Y 10M
        </motion.div>
        <motion.h1 variants={childVariants} className={StyledTitle}>
          {`PROJECTS`}
        </motion.h1>
        <motion.article variants={childVariants} className={StyledText}>
          <motion.div>
            <h3>2024.11 ~ 2024.01</h3>
            <h2>{t('Section04Title01')}</h2>
            <p>Illuminarean</p>
            <ul>
              <li className={StyledList}>{t('Section04Sub01Detail01')}</li>
              <li className={StyledList}>{t('Section04Sub01Detail02')}</li>
            </ul>
          </motion.div>
          <div className={StyledLine} />
          <motion.div>
            <h3>2024.07 ~ 2024.12</h3>
            <h2>{t('Section04Title02')}</h2>
            <p>Illuminarean</p>
            <ul>
              <li className={StyledList}>{t('Section04Sub02Detail01')}</li>
              <li className={StyledList}>{t('Section04Sub02Detail02')}</li>
              <li className={StyledList}>{t('Section04Sub02Detail03')}</li>
            </ul>
          </motion.div>

          <div className={StyledLine} />
          <motion.div>
            <h3>2023.01 ~ 2023.11</h3>
            <h2>{t('Section04Title03')}</h2>
            <p>YURA R&D Center</p>
            <ul>
              <li className={StyledList}>{t('Section04Sub03Detail01')}</li>
              <li className={StyledList}>{t('Section04Sub03Detail02')}</li>
              <li className={StyledList}>{t('Section04Sub03Detail03')}</li>
            </ul>
          </motion.div>
        </motion.article>
      </PageTransition>
    </div>
  )
}
export default Section04

const StyledLine = css({
  borderBottom: '0.3rem solid',
  color: 'MainText',
  margin: '2rem 0 2rem 0',
})

const StyledList = css({
  listStyleType: 'disc',
  marginLeft: '1.5rem',
})

const StyledInfoWrapper = css({
  display: 'flex',
  width: '70%',
  flexDirection: 'column',
  padding: '5rem',
  color: 'MainText',
  gap: '1rem',
})

const StyledCategory = css({
  fontSize: '1.5rem',
  lineHeight: '1rem',
  color: 'MainText',
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
