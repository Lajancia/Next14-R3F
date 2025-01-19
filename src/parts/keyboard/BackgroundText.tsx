import { css } from '../../../styled-system/css'
import PageTransition from '../../templates/PageAnimation'
import { motion } from 'framer-motion'
const BackgroundText = ({ showKeyboard }) => {
  const parentVariant = {
    hidden: { x: 100, height: '100vh', opacity: 0 },
    visible: { x: 0, height: '100vh', opacity: 1, transition: { duration: 0.8 } },
    exit: { x: 100, height: '100vh', opacity: 0, transition: { duration: 0.8 } },
  }
  return (
    <div className={TextContainerStyles}>
      <PageTransition transition={showKeyboard} parentVariant={parentVariant}>
        <motion.div className={textStyles}>
          MODERN
          <br />
          OBJECT
          <br />
          DESIGN
        </motion.div>
      </PageTransition>
    </div>
  )
}

export default BackgroundText

const textStyles = css({
  backgroundColor: '#F99417',
  color: 'background',
  lineHeight: '1em',
  textAlign: 'right',
  fontSize: '5rem',
  wordBreak: 'break-word',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',

  lg: { fontSize: '15rem' },
  xl: {
    backgroundColor: '#F99417',
    color: 'background',
    lineHeight: '1em',
    textAlign: 'right',
    fontSize: '10rem',
    wordBreak: 'break-word',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
})

const TextContainerStyles = css({
  display: 'none',
  overflow: 'hidden',
  position: 'absolute',
  right: '0',
  width: '100%',
  height: '100%',
  lg: { width: '100%' },
  xl: {
    display: 'block',
    overflow: 'hidden',
    position: 'absolute',
    right: '0',
    width: '50%',
    height: '100%',
  },
})
