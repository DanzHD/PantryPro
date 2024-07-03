import "./_select.scss"
import {ChangeEvent} from "react";

function Select({
  options,
  onChange,

}: {
  options: string[],
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void
}) {

  return (
    <>
      <select onChange={onChange} className="select">
        <option value="" >Filter</option>
        {
          options.map(option => {
            return <option key={option} value={option}>{option}</option>
          })
        }
      </select>
    </>
  )
}

export default Select

