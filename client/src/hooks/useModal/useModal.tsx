import { RefObject, useEffect, useState} from "react";

/**
 *
 * Returns a open boolean for whether the modal should be opened or closed.
 */
function useModal(button: RefObject<HTMLDivElement>, modalContainer: RefObject<HTMLDivElement>) {

  const [open, setOpen] = useState(false)

  useEffect(() => {
    function closeModal(e: Event) {
      if (modalContainer?.current?.contains(e.target as Node)) {
        return
      }

      if (button?.current === e.target) {
        setOpen(open => !open)
        return
      }

      setOpen(false)


    }

    document.addEventListener('click', closeModal)

    return () => {
      document.removeEventListener('click', closeModal)
    }

  }, [button]);

  return { open }

}

export default useModal