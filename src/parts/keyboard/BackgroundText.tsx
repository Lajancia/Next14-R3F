import { css } from '../../../styled-system/css'
import PageTransition from '../../templates/PageAnimation'
import { motion } from 'framer-motion'
const BackgroundText = ({ showKeyboard }) => {
  const parentVariant = {
    hidden: { x: 50, height: '100vh', opacity: 0 },
    visible: { x: 0, height: '100vh', opacity: 1, transition: { duration: 1.2 } },
    exit: { x: 50, height: '100vh', opacity: 0, transition: { duration: 1.2 } },
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
  fontSize: '12rem',
  wordBreak: 'break-word',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
})

const TextContainerStyles = css({
  overflow: 'hidden',
  position: 'absolute',
  right: '0',
  width: '50%',
  height: '100%',
})