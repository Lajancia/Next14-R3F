'use client'
import { css } from '../../../styled-system/css'
import Image from 'next/image'
import { motion } from 'framer-motion'
import PageTransition from '../../templates/PageAnimation'

const Info = ({ showKeyboard }) => {
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
          This 3D object can be controlled by the mouse. It is created with Blender software and displayed with
          Three.js.Recently, I got inspired by some of the modern industrial design objects and made this macro keyboard
          as a side project. Feel free to look around.
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
  padding: '5rem',
  marginTop: '15%',
  height: '75%',
  color: 'white',
  gap: '1rem',
})

const styledNumber = css({
  fontSize: '20rem',
  lineHeight: '16rem',
  color: 'MainText',
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
  fontSize: '1rem',
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
