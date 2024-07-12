import { RefObject, useEffect, useState} from "react";

/**
 *
 * Returns a open boolean for whether the modal should be opened or closed.
 */
function useModal(openModalDiv: RefObject<HTMLElement>) {

  const [open, setOpen] = useState(false)

  useEffect(() => {
    function closeModal(e: Event) {

      if (openModalDiv?.current?.contains( e.target as Node)) {
        setOpen(open => !open)
        return
      }

      setOpen(false)


    }

    document.addEventListener('click', closeModal)

    return () => {
      document.removeEventListener('click', closeModal)
    }

  }, [openModalDiv]);

  return { open, setOpen }

}

export default useModal