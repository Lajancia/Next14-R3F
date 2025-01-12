import { css } from '../../../styled-system/css'
import PageTransition from '../../templates/PageAnimation'
import { motion } from 'framer-motion'

const Footer = ({ showFooter }) => {
  const parentVariant = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, staggerChildren: 0.3 } },
    exit: { y: 50, opacity: 0, transition: { duration: 0.8 } },
  }

  const childVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
    exit: { y: 50, opacity: 0, transition: { duration: 0.8 } },
  }

  return (
    <PageTransition transition={showFooter} parentVariant={parentVariant}>
      <footer className={StyledContainer}>
        <motion.a href={'https://github.com/Lajancia'} target='_blank' variants={childVariants}>
          Github
        </motion.a>
        <motion.a href={'https://www.instagram.com/lajancia/'} target='_blank' variants={childVariants}>
          Instagram
        </motion.a>
        <motion.a href={'https://soomins.tistory.com/'} target='_blank' variants={childVariants}>
          Blog
        </motion.a>
        <motion.a href={'https://medium.com/@lajancia'} target='_blank' variants={childVariants}>
          Medium
        </motion.a>
      </footer>
    </PageTransition>
  )
}

export default Footer

const StyledContainer = css({
  display: 'flex',
  flexDirection: 'row',
  gap: '7rem',
  fontSize: '2rem',
  color: 'MainText',
  height: '100%',
  width: '100%',
})
