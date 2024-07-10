import "./_switch.scss"
import cx from "classnames";

function Switch({
  checked,
  small,
  name
}: {
  checked?: boolean,
  small?: boolean,
  name?: string
}) {

  const computedClasses = cx(
    "switch",
    {
      "switch--small": small
    }
  )

  return <>
    <label className={computedClasses}>
      <input name={name} type="checkbox" defaultChecked={checked}/>
      <span className="slider round"></span>
    </label>
  </>
}

export default Switch