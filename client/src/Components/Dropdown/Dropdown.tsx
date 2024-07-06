import "./_dropdown.scss"
import {ReactNode, useRef} from "react";
import useModal from "../../hooks/useModal/useModal.tsx";
import cx from "classnames";
import Text from "../Text/Text.tsx";

export default function Dropdown({
  children,
  className,
  placeholder
}: {
  children?: ReactNode,
  className?: string,
  placeholder?: string
}) {
  const computedClasses = cx(
    className,
    "dropdown"
  )

  const dropdownRef = useRef<HTMLDivElement>(null)

  const {open} = useModal(dropdownRef)


  return (
    <>
      {
        open &&
          <div className="dropdown-content-container">

            <div className="dropdown-content">
              {children}
            </div>
          </div>

      }
      <div className={computedClasses} ref={dropdownRef}>
        <div className="dropdown__title" >

          <Text >{placeholder}</Text>
          <span className="material-symbols-outlined">
            keyboard_arrow_down
          </span>
        </div>
      </div>
    </>
  )

}

export function DropdownMenuOption({
  onClick,
  option,
  className,
  danger
}:
{
  onClick?: () => void,
  option?: string,
  className?: string,
  danger?: boolean
}) {

  const computedClasses = cx("dropdown-content__option", className)

  return (
    <>
      <div className={computedClasses} onClick={onClick}>
        <Text danger={danger} bold={danger}>{option}</Text>
      </div>
    </>
  )

}
