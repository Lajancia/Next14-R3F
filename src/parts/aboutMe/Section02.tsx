import { css } from '../../../styled-system/css'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../../templates/PageAnimation'
import { SectionProps } from '../types/aboutMe'

type WorkItem = {
  dateKey: string
  companyKey: string
  roleKey: string
  details: string[]
}

const Section02 = ({ t, showSection }: SectionProps) => {
  const works: WorkItem[] = [
    { dateKey: 'Section02Work01Date', companyKey: 'Section02Work01Company', roleKey: 'Section02Work01Role', details: ['Section02Work01Detail01', 'Section02Work01Detail02', 'Section02Work01Detail03', 'Section02Work01Detail04', 'Section02Work01Detail05'] },
    { dateKey: 'Section02Work02Date', companyKey: 'Section02Work02Company', roleKey: 'Section02Work02Role', details: ['Section02Work02Detail01', 'Section02Work02Detail02'] },
    { dateKey: 'Section02Work03Date', companyKey: 'Section02Work03Company', roleKey: 'Section02Work03Role', details: ['Section02Work03Detail01', 'Section02Work03Detail02', 'Section02Work03Detail03'] },
    { dateKey: 'Section02Work04Date', companyKey: 'Section02Work04Company', roleKey: 'Section02Work04Role', details: ['Section02Work04Detail01', 'Section02Work04Detail02'] },
  ]

  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.8 } },
  }

  const childItem = {
    hidden: { x: -30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
    exit: { x: -30, opacity: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className={StyledInfoWrapper}>
      <AnimatePresence>
        <PageTransition transition={showSection}>
          <motion.div variants={childVariants} className={StyledCategory}>
            My Journey as a Developer
          </motion.div>
          <motion.h1 variants={childVariants} className={StyledTitle}>
            WORK EXPERIENCE
          </motion.h1>
          <div className={StyledTimelineContainer}>
            <motion.div className={StyledLine} variants={childVariants} />
            <div className={StyledTimeline}>
              {works.map((work, index) => (
                <motion.div key={index} variants={childItem} className={StyledTimelineItem}>
                  <div className={StyledDot} />
                  <div className={StyledCard}>
                    <div className={StyledDate}>{t(work.dateKey)}</div>
                    <div className={StyledCompany}>{t(work.companyKey)}</div>
                    <div className={StyledRole}>{t(work.roleKey)}</div>
                    <ul className={StyledUL}>
                      {work.details.map((detail, i) => (
                        <li key={i} className={StyledLI}>{t(detail)}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </PageTransition>
      </AnimatePresence>
    </div>
  )
}
export default Section02

const StyledUL = css({
  listStyleType: 'disc',
})

const StyledLI = css({
  listStylePosition: 'inside',
  fontSize: '0.95rem',
  marginBottom: '0.3rem',
  lg: { fontSize: '1.1rem' },
})

const StyledInfoWrapper = css({
  textAlign: 'center',
  width: '100%',
  padding: '2rem',
  minHeight: '100dvh',
  color: 'MainText',
  marginTop: '10vh',
  lg: { padding: '5rem' },
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
  paddingBottom: '3rem',
  lg: { fontSize: '5rem' },
})

const StyledTimelineContainer = css({
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  maxWidth: '50rem',
  margin: '0 auto',
})

const StyledLine = css({
  position: 'absolute',
  left: { base: '1rem', lg: '50%' },
  transform: { base: 'none', lg: 'translateX(-50%)' },
  width: '2px',
  backgroundColor: 'MainText',
  height: '100%',
})

const StyledTimeline = css({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  paddingLeft: { base: '2.5rem', lg: '0' },
})

const StyledTimelineItem = css({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '2rem',
  position: 'relative',
  lg: {
    width: '100%',
    '&:nth-child(odd)': {
      paddingRight: 'calc(50% + 2rem)',
      textAlign: 'right',
      '& ul': { textAlign: 'right' },
    },
    '&:nth-child(even)': {
      paddingLeft: 'calc(50% + 2rem)',
      marginLeft: 'auto',
      textAlign: 'left',
    },
  },
})

const StyledDot = css({
  position: 'absolute',
  left: { base: '0.65rem', lg: '50%' },
  transform: { base: 'none', lg: 'translateX(-50%)' },
  width: '0.7rem',
  height: '0.7rem',
  backgroundColor: 'Orange',
  borderRadius: '50%',
  marginTop: '0.5rem',
  zIndex: 1,
})

const StyledCard = css({
  backgroundColor: { base: 'rgba(30,30,30,0.04)', _dark: 'rgba(255,255,255,0.05)' },
  borderRadius: '0.5rem',
  padding: '1.2rem',
  width: '100%',
  textAlign: 'left',
  backdropFilter: 'blur(4px)',
  border: { base: '1px solid rgba(30,30,30,0.1)', _dark: '1px solid rgba(255,255,255,0.1)' },
  lg: { padding: '1.5rem' },
})

const StyledDate = css({
  fontSize: '0.9rem',
  color: 'Orange',
  fontWeight: 'bold',
  marginBottom: '0.3rem',
})

const StyledCompany = css({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  lineHeight: '1.8rem',
  color: 'MainText',
  lg: { fontSize: '2rem' },
})

const StyledRole = css({
  fontSize: '0.9rem',
  color: { base: 'rgba(30,30,30,0.5)', _dark: 'rgba(233,233,233,0.6)' },
  marginBottom: '0.8rem',
  lg: { fontSize: '1rem' },
})