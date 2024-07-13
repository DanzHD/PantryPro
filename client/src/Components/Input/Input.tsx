import "./_input.scss"
import cx from "classnames";
import React, {forwardRef} from "react";

type content = {
  className?: string,
  placeholder?: string,
  fullWidth?: boolean,
  name?: string,
  required?: boolean
  type?: string,
  onChange?: (e: React.ChangeEvent) => void,
  defaultValue?: string


}

const Input = forwardRef<HTMLInputElement, content>(function Input({
  className,
  placeholder,
  fullWidth,
  name,
  required,
  type,
  onChange,
  defaultValue
}: {
  className?: string,
  placeholder?: string,
  fullWidth?: boolean,
  name?:string,
  required?: boolean,
  type?: string,
  onChange?: (e: React.ChangeEvent) => void,
  defaultValue?: string
}, ref) {

  const computedClasses = cx(
    "input",
    {
      "input--full-width": fullWidth,
    },
    className

  )

  return <input
    onChange={onChange}
    className={computedClasses}
    name={name}
    placeholder={placeholder}
    type={type} ref={ref}
    defaultValue={defaultValue}
    required={required}
  />
})

export default Input