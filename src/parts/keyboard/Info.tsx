'use client'
import { css } from '../../../styled-system/css'
import { motion } from 'framer-motion'
import PageTransition from '../../templates/PageAnimation'
import { InfoProps } from '../types/keyboard'
import { CircleButtonProps } from '../types/keyboard'

const Info = ({ t, showKeyboard }: InfoProps) => {
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
    <PageTransition transition={showKeyboard}>
      <div className={StyledInfoWrapper}>
        <motion.div variants={childVariants} className={styledNumber}>
          01
        </motion.div>
        <motion.div variants={childVariants} className={StyledCategory}>
          Modern Art
        </motion.div>
        <motion.h1 variants={childVariants} className={StyledTitle}>
          MACRO KEYBOARD
        </motion.h1>
        <motion.article variants={childVariants} className={StyledText}>
          {t('mainExplanation')}
        </motion.article>
        <div className={StyledCircle}>
          <motion.div variants={childVariantsButton} className={circleButton({ color: 'white' })} />
          <motion.div variants={childVariantsButton} className={circleButton({ color: 'Orange' })} />
          <motion.div variants={childVariantsButton} className={circleButton({ color: 'black' })} />
        </div>
      </div>
    </PageTransition>
  )
}
export default Info

const StyledInfoWrapper = css({
  position: 'absolute',
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '2rem',
  marginBottom: '5vh',
  height: '65%',
  color: 'white',
  gap: '1rem',
  bottom: 10,
  lg: {
    marginTop: '25%',
    height: '75%',
    padding: '5rem',
    bottom: '0',
    marginBottom: 'auto',
  },
  xl: {
    marginTop: '15%',
    height: '75%',
    bottom: 'auto',
    marginBottom: 'auto',
  },
})

const styledNumber = css({
  fontSize: '10rem',
  lineHeight: '8rem',
  color: 'MainText',
  lg: { fontSize: '15rem', lineHeight: '10rem' },
  xl: { fontSize: '20rem', lineHeight: '16rem' },
})

const StyledCategory = css({
  fontSize: '1.5rem',
  lineHeight: '0.1rem',
  color: 'MainText',
})

const StyledTitle = css({
  fontSize: '3rem',
  lineHeight: '100%',
  color: 'MainText',
  lg: { fontSize: '5rem' },
  xl: { fontSize: '5rem' },
})

const StyledCircle = css({
  display: 'none',
  gap: '1rem',
  lg: { display: 'flex' },
})

const StyledText = css({
  fontSize: '0.8rem',
  color: 'MainText',
  lg: { fontSize: '1rem' },
  xl: { fontSize: '1rem' },
})

const circleButton = (props: CircleButtonProps) =>
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
