import { RefObject, useEffect, useState} from "react";

function useModal(button: RefObject<HTMLDivElement>) {

  const [open, setOpen] = useState(false)

  useEffect(() => {
    function closeModal(e) {
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