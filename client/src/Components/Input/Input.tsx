import "./_input.scss"
import cx from "classnames";
import {forwardRef} from "react";

type content = {
  className?: string,
  placeholder?: string,
  type?: string
}

const Input = forwardRef<HTMLInputElement, content>(function Input({
  className,
  placeholder,
  type
}: {
  className?: string,
  placeholder?: string,
  type?: string
}, ref) {

  const computedClasses = cx(
    "input",
    className

  )

  return <input className={computedClasses} placeholder={placeholder} type={type} ref={ref} />
})

export default Input