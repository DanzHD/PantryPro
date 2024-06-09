import {useEffect, useState} from "react";

export enum ScrollDirection {
  UP = "UP",
  DOWN = "DOWN"
}

function useScroll() {

  const [scrollPosition, setScrollPosition] = useState(window.scrollY)
  const [scrollDirection, setScrollDirection] = useState(ScrollDirection.UP)

  useEffect(() => {

    const handleScroll = () => {

      setScrollDirection((window.scrollY - scrollPosition) <= 0 ? ScrollDirection.UP : ScrollDirection.DOWN)
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)

  }, [scrollPosition]);

  return { scrollDirection, scrollPosition }

}

export default useScroll