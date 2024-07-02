import "./_select.scss"

function Select({
  options
}: {
  options: string[]
}) {

  return (
    <>
      <select className="select">
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

