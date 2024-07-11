import "./_switch.scss"
import cx from "classnames";
import {forwardRef} from "react";

interface Content {
  checked?: boolean,
  small?: boolean,
  name?: string
}

const Switch = forwardRef<HTMLInputElement, Content>(function({
  checked,
  small,
  name,
}: {
  checked?: boolean,
  small?: boolean,
  name?: string
}, ref) {


  const computedClasses = cx(
    "switch",
    {
      "switch--small": small
    }
  )


  return <>
    <label className={computedClasses}>
      <input ref={ref} name={name} type="checkbox" defaultChecked={checked}/>
      <span className="slider round"></span>
    </label>
  </>
})

export default Switch