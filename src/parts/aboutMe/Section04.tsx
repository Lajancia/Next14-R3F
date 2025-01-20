import { css } from '../../../styled-system/css'
import { motion } from 'framer-motion'
import PageTransition from '../../templates/PageAnimation'
import CustomToggle from 'src/components/CustomToggle'

const ProjectSkills = {
  project01: ['Next14', 'react-query', 'react-hook-form', 'Typescript', 'Github', 'Figma'],
  project02: ['Next14', 'Docker', 'Jenkins', 'Typescript', 'Github', 'AWS'],
  project03: ['React', 'Python', 'Apext Chart', 'Github', 'Java Spring Boot', 'Linux'],
  project04: ['Vue.js', 'Vuetify', 'Github', 'Shared Host'],
}
const Section04 = ({ t, showSection04 }) => {
  const parentVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, staggerChildren: 0.8 } },
    exit: { x: 50, opacity: 0, transition: { duration: 0.8 } },
  }
  const childVariantsContents = {
    hidden: { x: 0, y: 50, opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1, transition: { duration: 0.8 } },
    exit: { x: 50, opacity: 0, transition: { duration: 0.8 } },
  }

  const childVariantsLine = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: '100%', y: 0, opacity: 1, transition: { duration: 0.8 } },
    exit: { width: 0, opacity: 0, transition: { duration: 0.8 } },
  }

  return (
    <div className={StyledInfoWrapper}>
      <PageTransition transition={showSection04} parentVariant={parentVariants}>
        <motion.div variants={childVariantsContents} className={StyledCategory}>
          Career Profile 2Y 10M
        </motion.div>
        <motion.h1 variants={childVariantsContents} className={StyledTitle}>
          {`PROJECTS`}
        </motion.h1>
        <article className={StyledText}>
          <motion.div variants={childVariantsContents}>
            <h3 className={StyledDate}>2024.11 ~ 2024.01</h3>
            <h2 className={StyledProjectTitle}>{t('Section04Title01')}</h2>
            {ProjectSkills.project01.map((skill, index) => {
              return <CustomToggle key={index} toggleName={skill} />
            })}
            <p className={StyledCompany}>Illuminarean</p>
            <ul>
              <li className={StyledList}>{t('Section04Sub01Detail01')}</li>
              <li className={StyledList}>{t('Section04Sub01Detail02')}</li>
            </ul>
          </motion.div>
          <motion.div className={StyledLine} variants={childVariantsLine} />
          <motion.div variants={childVariantsContents}>
            <h3 className={StyledDate}>2024.07 ~ 2024.12</h3>
            <h2 className={StyledProjectTitle}>{t('Section04Title02')}</h2>
            {ProjectSkills.project02.map((skill, index) => {
              return <CustomToggle key={index} toggleName={skill} />
            })}
            <p className={StyledCompany}>Illuminarean</p>
            <ul>
              <li className={StyledList}>{t('Section04Sub02Detail01')}</li>
              <li className={StyledList}>{t('Section04Sub02Detail02')}</li>
              <li className={StyledList}>{t('Section04Sub02Detail03')}</li>
            </ul>
          </motion.div>

          <motion.div className={StyledLine} variants={childVariantsLine} />
          <motion.div variants={childVariantsContents}>
            <h3 className={StyledDate}>2023.01 ~ 2023.11</h3>
            <h2 className={StyledProjectTitle}>{t('Section04Title03')}</h2>
            {ProjectSkills.project03.map((skill, index) => {
              return <CustomToggle key={index} toggleName={skill} />
            })}
            <p className={StyledCompany}> YURA R&D Center</p>
            <ul>
              <li className={StyledList}>{t('Section04Sub03Detail01')}</li>
              <li className={StyledList}>{t('Section04Sub03Detail02')}</li>
              <li className={StyledList}>{t('Section04Sub03Detail03')}</li>
            </ul>
          </motion.div>

          <motion.div className={StyledLine} variants={childVariantsLine} />
          <motion.div variants={childVariantsContents}>
            <h3 className={StyledDate}>2021.11 ~ 2022.05</h3>
            <h2 className={StyledProjectTitle}>{t('Section04Title04')}</h2>
            {ProjectSkills.project04.map((skill, index) => {
              return <CustomToggle key={index} toggleName={skill} />
            })}
            <p className={StyledCompany}> Common SRL</p>
            <ul>
              <li className={StyledList}>{t('Section04Sub04Detail01')}</li>
              <li className={StyledList}>{t('Section04Sub04Detail02')}</li>
            </ul>
          </motion.div>
          <motion.div className={StyledLine} variants={childVariantsLine} />
        </article>
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
  fontSize: '1rem',
  lg: { fontSize: '1.3rem' },
})

const StyledInfoWrapper = css({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  padding: '2rem',
  color: 'MainText',
  gap: '1rem',
  lg: { width: '100%', padding: '5rem' },
  xl: { width: '70%' },
})

const StyledCategory = css({
  fontSize: '1rem',
  lineHeight: '1rem',
  color: 'MainText',
  lg: { fontSize: '1.5rem' },
})

const StyledTitle = css({
  fontSize: '3rem',
  lineHeight: '100%',
  color: 'MainText',
  marginBottom: '2rem',
  lg: { fontSize: '5rem' },
})

const StyledText = css({
  fontSize: '1.5rem',
  color: 'MainText',
})

const StyledDate = css({
  fontSize: '1rem',
})

const StyledProjectTitle = css({
  fontSize: '1.5rem',
  lineHeight: '2.5rem',
  fontWeight: 'bold',
  lg: { fontSize: '2.5rem' },
})

const StyledCompany = css({
  fontSize: '1.2rem',
})
