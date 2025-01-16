import { css } from '../../../styled-system/css'
import Image from 'next/image'
import { motion } from 'framer-motion'
import PageTransition from '../../templates/PageAnimation'

const Section05 = ({ showSection05 }) => {
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
    <PageTransition transition={showSection05}>
      <div className={StyledInfoWrapper}>
        <motion.div variants={childVariants} className={StyledCategory}>
          ARTICLES
        </motion.div>
        <motion.h1 variants={childVariants} className={StyledTitle}>
          {`ARTICLES`}
        </motion.h1>
        <motion.article variants={childVariants} className={StyledText}>
          {'Personal articles on various problem-solving methods encountered during the development process.'}
        </motion.article>
      </div>
      <div className={StyledLink}>
        <a href='https://soomins.tistory.com/52' target='_blank'>
          Next14 + Docker Image Resuse
        </a>
        <a href='https://soomins.tistory.com/35' target='_blank'>
          Understanding AWS Services
        </a>
        <a href='https://soomins.tistory.com/40' target='_blank'>
          Next14 Render Type
        </a>
        <a href='https://soomins.tistory.com/37' target='_blank'>
          Docker + Jenkins + Github + Grafana + Next14
        </a>
        <a href='https://soomins.tistory.com/33' target='_blank'>
          React-Three-Fiber WebXR
        </a>
      </div>
    </PageTransition>
  )
}
export default Section05

const StyledLink = css({
  textAlign: 'left',
  position: 'absolute',
  display: 'flex',
  width: '60%',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '5rem',
  height: '100%',
  color: 'MainText',
  fontSize: '2.5rem',
  gap: '1rem',

  '& a': {
    transition: '0.5s',
  },
  '& a:hover': {
    color: 'Orange',
  },
})
const StyledInfoWrapper = css({
  textAlign: 'right',
  position: 'absolute',
  display: 'flex',
  right: 0,
  width: '40%',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '5rem',
  height: '100%',
  color: 'MainText',
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
