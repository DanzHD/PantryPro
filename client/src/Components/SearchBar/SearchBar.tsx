import "./_searchBar.scss"
import {ChangeEvent} from "react";

function SearchBar({
  placeholder,
  onChange
}: {
  placeholder?: string,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}) {

  return (
    <>
      <input className="search-bar" onChange={onChange} type="text" placeholder={placeholder} />
    </>
  )
}

export default SearchBar