import { css } from '../../../styled-system/css'
import { motion } from 'framer-motion'
import PageTransition from '../../templates/PageAnimation'
import CustomToggle from 'src/components/CustomToggle'
import { SectionProps } from '../types/aboutMe'

type ProjectItem = {
  titleKey: string
  dateKey: string
  companyKey: string
  stackKey: string
  details: string[]
}

const Section04 = ({ t, showSection }: SectionProps) => {
  const projects: ProjectItem[] = [
    { titleKey: 'Section04Title01', dateKey: 'Section04Date01', companyKey: 'Section04Company01', stackKey: 'Section04Stack01', details: ['Section04Sub01Detail01', 'Section04Sub01Detail02', 'Section04Sub01Detail03', 'Section04Sub01Detail04'] },
    { titleKey: 'Section04Title02', dateKey: 'Section04Date02', companyKey: 'Section04Company02', stackKey: 'Section04Stack02', details: ['Section04Sub02Detail01', 'Section04Sub02Detail02', 'Section04Sub02Detail03', 'Section04Sub02Detail04'] },
    { titleKey: 'Section04Title03', dateKey: 'Section04Date03', companyKey: 'Section04Company03', stackKey: 'Section04Stack03', details: ['Section04Sub03Detail01', 'Section04Sub03Detail02', 'Section04Sub03Detail03', 'Section04Sub03Detail04'] },
    { titleKey: 'Section04Title04', dateKey: 'Section04Date04', companyKey: 'Section04Company04', stackKey: 'Section04Stack04', details: ['Section04Sub04Detail01', 'Section04Sub04Detail02', 'Section04Sub04Detail03', 'Section04Sub04Detail04'] },
    { titleKey: 'Section04Title05', dateKey: 'Section04Date05', companyKey: 'Section04Company05', stackKey: 'Section04Stack05', details: ['Section04Sub05Detail01', 'Section04Sub05Detail02', 'Section04Sub05Detail03'] },
    { titleKey: 'Section04Title06', dateKey: 'Section04Date06', companyKey: 'Section04Company06', stackKey: 'Section04Stack06', details: ['Section04Sub06Detail01', 'Section04Sub06Detail02', 'Section04Sub06Detail03'] },
    { titleKey: 'Section04Title07', dateKey: 'Section04Date07', companyKey: 'Section04Company07', stackKey: 'Section04Stack07', details: ['Section04Sub07Detail01', 'Section04Sub07Detail02', 'Section04Sub07Detail03', 'Section04Sub07Detail04'] },
    { titleKey: 'Section04Title08', dateKey: 'Section04Date08', companyKey: 'Section04Company08', stackKey: 'Section04Stack08', details: ['Section04Sub08Detail01', 'Section04Sub08Detail02', 'Section04Sub08Detail03'] },
  ]

  const parentVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, staggerChildren: 0.3 } },
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

  const getStackArray = (stackKey: string): string[] => {
    const stack = t(stackKey)
    return stack.split(', ').map(s => s.trim())
  }

  return (
    <div className={StyledInfoWrapper}>
      <PageTransition transition={showSection} parentVariant={parentVariants}>
        <motion.div variants={childVariantsContents} className={StyledCategory}>
          Career Profile 4Y 5M
        </motion.div>
        <motion.h1 variants={childVariantsContents} className={StyledTitle}>
          {`PROJECTS`}
        </motion.h1>
        <article className={StyledText}>
          {projects.map((project, index) => (
            <motion.div key={index} variants={childVariantsContents}>
              <h3 className={StyledDate}>{t(project.dateKey)}</h3>
              <h2 className={StyledProjectTitle}>{t(project.titleKey)}</h2>
              <div className={StyledStackRow}>
                {getStackArray(project.stackKey).map((skill, i) => (
                  <CustomToggle key={i} toggleName={skill} />
                ))}
              </div>
              <p className={StyledCompany}>{t(project.companyKey)}</p>
              <ul>
                {project.details.map((detail, i) => (
                  <li key={i} className={StyledList}>{t(detail)}</li>
                ))}
              </ul>
              {index < projects.length - 1 && (
                <motion.div className={StyledLine} variants={childVariantsLine} />
              )}
            </motion.div>
          ))}
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
  lg: { fontSize: '1.1rem' },
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
  marginBottom: '0.5rem',
})

const StyledStackRow = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.3rem',
  marginBottom: '0.5rem',
})