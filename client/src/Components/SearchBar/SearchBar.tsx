import "./_searchBar.scss"
import {ChangeEvent, useRef} from "react";
import cx from "classnames";
import useModal from "../../hooks/useModal/useModal.tsx";
import Text from "../Text/Text.tsx";

export interface Item {
  id: number,
  name: string
}

function SearchBar({
  dropdownItems,
  placeholder,
  onChange,
  fullWidth,
  handleSelectItem
}: {
  dropdownItems?: Item[],
  placeholder?: string,
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
  fullWidth?: boolean,
  handleSelectItem?: (item: Item) => void
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

  function handleItemSelection(item: Item) {
    if (!handleSelectItem) {
      return
    }

    handleSelectItem(item)
  }


  return (
    <>
      <input ref={searchBarRef} className={computedClassesInput} onChange={handleSearch} type="text" placeholder={placeholder} />
        {
          open && dropdownItems && dropdownItems.length > 0 &&

            <div className={cx("dropdown-container",
              {
                "dropdown-container--full-width": fullWidth
              })}
            >
              <div className={computedClassesDropdown}>
                {

                  dropdownItems.map(item => {
                    return <div key={item.id} onClick={() => handleItemSelection(item)} className="dropdown-search-item">
                      <Text key={item.id}>{item.name}</Text>
                    </div>
                  })
                }

              </div>
            </div>

        }
      {
        open && dropdownItems && dropdownItems.length === 0 && searchBarRef.current && searchBarRef.current.value !== "" &&
          <div className={cx("dropdown-container",
            {
              "dropdown-container--full-width": fullWidth
            })}
          >

            <div className={computedClassesDropdown}>

              <div className="dropdown-search-item"><Text bold>No recipes found</Text></div>
            </div>
          </div>
      }


    </>
  )
}

export default SearchBar