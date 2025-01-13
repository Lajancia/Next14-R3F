import { css } from '../../../styled-system/css'
import Image from 'next/image'
import { motion } from 'framer-motion'
import PageTransition from '../../templates/PageAnimation'

const Section01 = ({ showSection02 }) => {
  const childVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.8 } },
  }
  const childVariantsButton = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: '100%', y: 0, opacity: 1, transition: { duration: 2 } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.8 } },
  }

  return (
    <PageTransition transition={showSection02}>
      <div className={StyledInfoWrapper}>
        <motion.div variants={childVariants} className={StyledCategory}>
          My Journey as a Developer
        </motion.div>
        <motion.h1 variants={childVariants} className={StyledTitle}>
          WORK EXPERIENCE
        </motion.h1>
        <motion.div className={StyledWorkLineContainer} variants={childVariantsButton}>
          <div className={StyledLeft}>
            <motion.div className={StyledWorkDate}>2023.06.02 ~ Present</motion.div>
            <motion.div className={StyledWork}>
              <div className={StyledPosition}>Associate Research Engineer</div>
              <div className={StyledCompany}>YURA R&D Center</div>

              <ol className={StyledOL}>
                <li
                  className={StyledLI}
                >{`Developed and maintained a smart monitoring web application for efficient production management at the manufacturing plant in Serbia.`}</li>

                <li className={StyledLI}>Responsible for Java Spring Boot API migration and additional development.</li>
              </ol>
            </motion.div>
            <motion.div className={StyledWorkDate}>2021.11 ~ 2022.05</motion.div>
          </div>

          <div className={StyledLine} />
          <div className={StyledRight}>
            <motion.div className={StyledWork}>
              <div className={StyledPosition}>Frontend Developer</div>
              <div className={StyledCompany}>Illmuminarean</div>
              <ol className={StyledOL}>
                <li className={StyledLI}>Developed, managed, and improved the company's website.</li>
                <li className={StyledLI}>
                  Contributed to optimizing deployment time by collaborating with DevOps, reducing deployment time from
                  15 minutes to 3 minutes.
                </li>
                <li className={StyledLI}>Conducted in-house training and implementation of Docker and MSW mocking.</li>
              </ol>
            </motion.div>
            <motion.div className={StyledWork}>2022.10 ~ 2023.05</motion.div>
            <motion.div className={StyledWork}>
              <div className={StyledPosition}>Web Developer</div>
              <div className={StyledCompany}>CommON SRL</div>

              <ol className={StyledOL}>
                <li className={StyledLI}>
                  Developed the company website frontend, managed DNS and web publishing, and handled SNS insights
                  management.
                </li>
                <li className={StyledLI}> Responsible for frontend maintenance and support.</li>
              </ol>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
export default Section01

const StyledOL = css({
  listStyleType: 'decimal',
})

const StyledLI = css({
  listStylePosition: 'inside',
})

const StyledWorkDate = css({
  textAlign: 'right',
  marginTop: '1rem',
  height: '100%',
})

const StyledInfoWrapper = css({
  position: 'absolute',
  textAlign: 'center',
  width: '100%',
  padding: '5rem',
  height: '90vh',
  color: 'white',
  gap: '1rem',
  marginTop: '10vh',
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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginRight: '1rem',
  marginTop: ' 3rem',
  width: '35%',
  color: 'MainText',
  textAlign: 'right',
})

const StyledRight = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginLeft: '1rem',
  marginTop: ' 3rem',
  width: '35%',
  color: 'MainText',
  textAlign: 'left',
})

const StyledWork = css({
  height: '30%',
  marginBottom: '1rem',
  textAlign: 'left',
  padding: '1rem',
})

const StyledCategory = css({
  fontSize: '1.2rem',
  lineHeight: '0.1rem',
  color: 'MainText',
})

const StyledTitle = css({
  fontSize: '5rem',
  lineHeight: '100%',
  color: 'MainText',
})

const StyledCircle = css({
  display: 'flex',
  gap: '1rem',
})

const StyledDate = css({
  fontSize: '2.5rem',
  color: 'MainText',
})

const StyledText = css({
  fontSize: '1.5rem',
  color: 'MainText',
})

const circleButton = (props) =>
  css({
    width: '3rem',
    height: '3rem',
    backgroundColor: props.color === 'white' ? 'white' : props.color === 'Orange' ? 'Orange' : 'Black',
    border: 'none',
    borderRadius: '50%',
    textAlign: 'center',
    lineHeight: '4.4rem',
    fontSize: '1.5rem',
    cursor: 'pointer',
  })

const StyledWorkLineContainer = css({
  margin: 0,
  display: 'flex',
  justifyContent: 'center',
})

const StyledLine = css({
  width: '2px',
  backgroundColor: 'MainText',
  position: 'relative',
  height: '100%',
})
