import { css } from '../../../styled-system/css'
import Image from 'next/image'
import { motion } from 'framer-motion'
import PageTransition from '../../templates/PageAnimation'
import BoxesCursor from '../../components/canvas/Boxes'

const SkillList = ['Next14', 'Typescript', 'Github', 'Linux', 'Blender', 'React', 'Jenkins', 'Docker']
const CustomToggle = ({ toggleName }) => {
  return (
    <button disabled={true} className={StyledToggle}>
      {toggleName}
    </button>
  )
}
const Section03 = ({ showSection03 }) => {
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
      <PageTransition transition={showSection03}>
        <div className={StyledInfoWrapper}>
          <motion.div variants={childVariants} className={StyledCategory}>
            {`What I'm capable of`}
          </motion.div>
          <motion.h1 variants={childVariants} className={StyledTitle}>
            SKILLS
          </motion.h1>
          <motion.div variants={childVariants} className={StyledSkills}>
            {SkillList.map((skill, index) => {
              return <CustomToggle toggleName={skill} />
            })}
          </motion.div>
        </div>
        <div className={StyledBoxWrapper}>
          <BoxesCursor />
        </div>
      </PageTransition>
    </div>
  )
}
export default Section03

const StyledSkills = css({
  display: 'block',
  width: '100%',
  textAlign: 'center',
  padding: '0rem 2rem',
  lg: { display: 'none' },
})

const StyledBoxWrapper = css({
  display: 'none',
  width: '100%',
  height: '100%',
  lg: { display: 'block' },
})

const StyledContainer = css({
  height: '100%',
  width: '100%',
  marginTop: '10vh',
  textAlign: 'center',
})
const StyledInfoWrapper = css({
  display: 'flex',
  textAlign: 'center',
  position: 'absolute',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',

  height: '90%',
  color: 'white',
  gap: '1rem',

  lg: { width: '100%' },
})

const StyledToggle = css({
  padding: '0.2rem 0.5rem',
  backgroundColor: 'MainText',
  color: 'background',
  borderRadius: '0.5rem',
  margin: '0.5rem',
})
const StyledCategory = css({
  fontSize: '1.5rem',
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
