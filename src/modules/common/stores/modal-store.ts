import create from "zustand";

import { Size } from "@/modules/utils/types/basicTypes";

type Modal = {
  isOpen?: boolean;
  customBody?: React.ReactNode;
  backdrop?: string;
  content: React.ReactNode;
  size?: Size;
  title?: string;
  confirmText?: string;
  closeText?: string;
  onClose?: () => void;
  onConfirm?: (data?: unknown) => void;
  isClosable?: boolean;
};

type ModalState = {
  modal: Modal;
  openModal: (modal: Modal) => void;
  closeModal: () => void;
};

const defaultModalState = {
  isOpen: false,
  customBody: "",
  title: "",
  backdrop: "",
  confirmText: "",
  content: "",
  additionalClasses: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onConfirm: () => {},
};

export const useModalStore = create<ModalState>((set) => ({
  modal: { ...defaultModalState } as Modal,
  openModal: (modal: Modal) => set({ modal: { ...modal, isOpen: true } }),
  closeModal: () => set({ modal: { ...defaultModalState } }),
}));
