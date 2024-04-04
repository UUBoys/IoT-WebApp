/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import * as React from "react";

import { useModalStore } from "../../stores/modal-store";

import { Size } from "@/modules/utils/types/basicTypes";
import { maxWidthClasses } from "@/modules/utils/types/tailwindHelpers";

const Modal: React.FunctionComponent = () => {
  const { modal, closeModal } = useModalStore((state) => ({
    modal: state.modal,
    closeModal: state.closeModal,
  }));

  const {
    title,
    content,
    isOpen,
    onConfirm,
    backdrop,
    customBody,
    onClose,
    size = Size.xl,
    confirmText,
    closeText,
    isClosable,
  } = modal;

  const handleConfirm = React.useCallback(() => {
    if (typeof onConfirm === "function") onConfirm();
    closeModal();
  }, [onConfirm, closeModal]);

  const handleClose = React.useCallback(() => {
    if (isClosable) {
      if (typeof onClose === "function") onClose();
      closeModal();
    }
  }, [isClosable, onClose, closeModal]);

  const maxWidthClass = React.useMemo(() => maxWidthClasses[size], [size]);

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-[988]"
        onClick={() => handleClose()}
        onClose={handleClose}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={clsx(
              backdrop,
              "fixed inset-0 bg-black/25  backdrop-blur-sm"
            )}
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {customBody || (
                <Dialog.Panel
                  className={clsx(
                    maxWidthClass,
                    "w-full overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all"
                  )}
                >
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  {content}
                  <div className="flex justify-around">
                    {closeText && (
                      <div className="mt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-red-500 px-7 py-3 text-base font-medium text-white"
                          onClick={handleClose}
                        >
                          {closeText}
                        </button>
                      </div>
                    )}
                    {confirmText && (
                      <div className="mt-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-green-500 px-7 py-3 text-base font-medium text-white"
                          onClick={handleConfirm}
                        >
                          {confirmText}
                        </button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              )}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
