import {ReactNode, Ref} from "react";

function Modal({
  children,
  modalRef
}: {
  children: ReactNode,
  modalRef: Ref<HTMLDialogElement>
}) {


  return (
    <>
      <dialog className="modal" ref={modalRef}>
        {children}
      </dialog>
    </>
  )
}

export default Modal