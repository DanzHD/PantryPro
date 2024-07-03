import "./_select.scss"
import {ChangeEvent, ReactNode} from "react";
import cx from "classnames";

function Select({
  children,
  onChange,
  placeholder,
  className


}: {
  children?: ReactNode,
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void,
  placeholder?: string,
  className?: string
}) {

  const computedClasses = cx(
    className,
    "select"
  )

  return (
    <>
      <select onChange={onChange} className={computedClasses}>
        <option value="" >{placeholder}</option>
        {children}
      </select>
    </>
  )
}

export default Select

