import React, { ReactNode } from 'react'
import Dialog from 'react-modal'
import { useEffect } from 'react'
Dialog.setAppElement('body')

type CommonModalProps = {
  children: ReactNode
  isOpen: boolean
  onRequestClose?: () => void
}

const Modal: React.FC<CommonModalProps> = ({ children, isOpen, onRequestClose }) => {
  return (
    <Dialog
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',

          zIndex: 100,
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          padding: '0',
          transform: 'translate(-50%, -50%)',

          zIndex: 100,
        },
      }}
    >
      {children}
    </Dialog>
  )
}
export default Modal
