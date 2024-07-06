import "./_select.scss"
import {ChangeEvent, ReactNode, useState} from "react";
import cx from "classnames";

function Select({
  children,
  onChange,
  placeholder,
  name,
  required,
  disabled,
  className,
  selected


}: {
  children?: ReactNode,
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void,
  placeholder?: string,
  name?: string,
  required?: boolean,
  selected?: boolean,
  disabled?: boolean,
  className?: string
}) {

  const [filterSelected, setFilterSelected] = useState<boolean>(false)

  const computedClasses = cx(
    className,
    "select",
    {
      "select--none": !filterSelected
    }
  )

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {

    setFilterSelected(event.target.selectedIndex !== 0)

    if (onChange) {

      onChange(event)
    }
  }

  return (
    <>
      <select name={name} onChange={handleSelectChange} className={computedClasses} required={required}>
        <option disabled={disabled} selected={selected} value="" style={{color: "darkgray"}}>{placeholder}</option>
        {children}
      </select>
    </>
  )
}

export default Select

