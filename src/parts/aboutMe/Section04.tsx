import { css } from '../../../styled-system/css'
import Image from 'next/image'
import { motion } from 'framer-motion'
import PageTransition from '../../templates/PageAnimation'

const Section04 = ({ showSection04 }) => {
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
    <PageTransition transition={showSection04}>
      <div className={StyledInfoWrapper}>
        <motion.div variants={childVariants} className={StyledCategory}>
          Career Profile
        </motion.div>
        <motion.h1 variants={childVariants} className={StyledTitle}>
          {`PROJECTS`}
        </motion.h1>
        <motion.article variants={childVariants} className={StyledText}>
          {
            'I am a front-end developer with 2 years of experience. I primarily use Next.js and React. I am also capable of developing interactive 3D web experiences using Blender and React-Three-Fiber.'
          }
        </motion.article>
      </div>
    </PageTransition>
  )
}
export default Section04

const StyledInfoWrapper = css({
  position: 'absolute',
  display: 'flex',
  width: '60%',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '5rem',
  height: '100%',
  color: 'white',
  gap: '1rem',
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

const StyledText = css({
  fontSize: '1.5rem',
  color: 'MainText',
})
