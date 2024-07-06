import "./_input.scss"
import cx from "classnames";
import {forwardRef} from "react";

type content = {
  className?: string,
  placeholder?: string,
  fullWidth?: boolean,
  name?: string,
  required?: boolean
  type?: string,
}

const Input = forwardRef<HTMLInputElement, content>(function Input({
  className,
  placeholder,
  fullWidth,
  name,
  required,
  type
}: {
  className?: string,
  placeholder?: string,
  fullWidth?: boolean,
  name?:string,
  required?: boolean,
  type?: string
}, ref) {

  const computedClasses = cx(
    "input",
    {
      "input--full-width": fullWidth,
    },
    className

  )

  return <input className={computedClasses} name={name} placeholder={placeholder} type={type} ref={ref} required={required} />
})

export default Input