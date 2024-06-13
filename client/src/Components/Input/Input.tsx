import "./_input.scss"
import cx from "classnames";

function Input({
  className,
  placeholder,
  type
}: {
  className?: string,
  placeholder?: string,
  type?: string
}) {

  const computedClasses = cx(
    "input",
    className

  )

  return <input className={computedClasses} placeholder={placeholder} type={type} />
}

export default Input