import { create } from 'zustand'

type State = {
  modalState: boolean
}

type Action = {
  openModal: () => void
  closeModal: () => void
}

const useOpenModalStore = create<State & Action>((set) => ({
  modalState: false,

  openModal: () => set(() => ({ modalState: true })),
  closeModal: () => set(() => ({ modalState: false })),
}))

export default useOpenModalStore
