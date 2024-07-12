import "./_searchBar.scss"
import {ChangeEvent, useRef} from "react";
import cx from "classnames";
import useModal from "../../hooks/useModal/useModal.tsx";
import {Recipe} from "../../pages/MealPlanner/Body.tsx";
import Text from "../Text/Text.tsx";
import {Simulate} from "react-dom/test-utils";
import drop = Simulate.drop;

function SearchBar({
  dropdownItems,
  placeholder,
  onChange,
  fullWidth
}: {
  dropdownItems?: Recipe[],
  placeholder?: string,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  fullWidth?: boolean,
}) {
  let searchTimeout: ReturnType<typeof setTimeout>
  const searchBarRef = useRef<HTMLInputElement>(null)
  const {open, setOpen} = useModal(searchBarRef)

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    if (onChange) {

      clearTimeout(searchTimeout)

      searchTimeout = setTimeout(() => {
        onChange(event)
        setOpen(true)
      }, 500)

    }
  }

  const computedClassesInput = cx(
    "search-bar",
    {
      "search-bar--full-width": fullWidth
    }
  )

  const computedClassesDropdown = cx(
    "search-bar-dropdown",
    {
      "search-bar-dropdown--full-width": fullWidth
    }
  )


  return (
    <>
      <input ref={searchBarRef} className={computedClassesInput} onChange={handleSearch} type="text" placeholder={placeholder} />
        {
          open && dropdownItems && dropdownItems.length > 0 &&
            <div className={computedClassesDropdown}>
              {

                dropdownItems.map(item => {
                  return <div className="dropdown-search-item">
                    <Text key={item.id}>{item.name}</Text>
                  </div>
                })
              }
            </div>

        }
      {
        open && dropdownItems && dropdownItems.length === 0 && searchBarRef.current && searchBarRef.current.value !== "" &&
          <div className={computedClassesDropdown}>

            <div className="dropdown-search-item"><Text bold>No recipes found</Text></div>
          </div>
      }


    </>
  )
}

export default SearchBar