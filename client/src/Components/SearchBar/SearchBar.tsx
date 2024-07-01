import "./_searchBar.scss"

function SearchBar({
  placeholder,
}: {
  placeholder?: string
}) {

  return (
    <>
      <input className="search-bar" type="text" placeholder={placeholder} />
    </>
  )
}

export default SearchBar