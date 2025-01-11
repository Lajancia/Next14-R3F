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

  return (
    <PageTransition transition={showKeyboard}>
      <div className={StyledInfoWrapper}>
        <motion.div variants={childVariants} className={StyledCategory}>
          Modern Art
        </motion.div>
        <motion.h1 variants={childVariants} className={StyledTitle}>
          MACRO KEYBOARD
        </motion.h1>
        <motion.div variants={childVariants} className={StyledCircle}>
          <div className={circleButton({ color: 'white' })} />
          <button className={circleButton({ color: 'Orange' })} />
          <button className={circleButton({ color: 'black' })} />
        </motion.div>
        <motion.p variants={childVariants} className={StyledDate}>
          2024-10-19
        </motion.p>
        <motion.article variants={childVariants} className={StyledText}>
          This 3D object can be controlled by the mouse. It is created with Blender software and displayed with
          Three.js.Recently, I got inspired by some of the modern industrial design objects and made this macro keyboard
          as a side project. Feel free to look around.
        </motion.article>
        <motion.div variants={childVariants} className={StyledImages}>
          <Image
            src='/img/keyboard/keyboard-1.png'
            alt='Example Image'
            width={1000}
            height={1000}
            className={StyledImage}
          />
          <Image
            src='/img/keyboard/keyboard-2.png'
            alt='Example Image'
            width={1000}
            height={1000}
            className={StyledImage}
          />
          <Image
            src='/img/keyboard/keyboard-3.png'
            alt='Example Image'
            width={1000}
            height={1000}
            className={StyledImage}
          />
        </motion.div>
      </div>
    </PageTransition>
  )
}
export default Info

const StyledInfoWrapper = css({
  display: 'flex',
  width: '90%',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '5rem',
  marginTop: '15%',
  height: '75%',
  color: 'white',
  gap: '1rem',
})

const StyledCategory = css({
  fontSize: '2rem',
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

const StyledImages = css({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1rem',
})

const StyledImage = css({
  width: '25%',
  height: '16rem',
  objectFit: 'cover',
})
