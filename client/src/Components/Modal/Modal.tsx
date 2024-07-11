import {ReactNode, Ref} from "react";
import "./_modal.scss"
import cx from "classnames";


function Modal({
  children,
  modalRef,
  className,
  id,

}: {
  children: ReactNode,
  modalRef: Ref<HTMLDialogElement>,
  className?: string,
  id?: string
}) {

  const computedClasses = cx(
    "modal",
    className
  )


  return (
    <>
      <dialog className={computedClasses} id={id} ref={modalRef}>
        {children}
      </dialog>
    </>
  )
}

export default Modal