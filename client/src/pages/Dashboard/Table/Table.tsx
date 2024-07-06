import "./_table.scss"
import SearchBar from "../../../Components/SearchBar/SearchBar.tsx";
import Select from "../../../Components/SelectInput/Select.tsx";
import TableSettings from "./TableSettings.tsx";

import { Food } from "../../../dto/FoodResponse.tsx";
import {useAuthContext} from "../../../Context/AuthContext/useAuthContext.tsx";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {addFoodForUser, deleteFood, getUserFood} from "../../../api/food.tsx";
import FoodGroups from "../../../enum/foodGroups.tsx";
import Dropdown, {DropdownMenuOption} from "../../../Components/Dropdown/Dropdown.tsx";
import TableData from "./TableData.tsx";
import {FoodRequestDto} from "../../../dto/FoodRequestDto.tsx";
import Pagination from "../../../Components/Pagination/Pagination.tsx";


const ROWS_PER_PAGE = 15

function Table() {
  const {accessToken} = useAuthContext()
  const selectAllCheckBoxRef = useRef<HTMLInputElement>(null)
  const [foods, setFood] = useState<Food[] | undefined>()
  const [totalFoodCount, setTotalFoodCount] = useState(0)
  const [pageSelected, setPageSelected] = useState(0)
  const [foodsChecked, setFoodsChecked] = useState(new Map<number, boolean>())
  const [foodGroupFilter, setFoodGroupFilter] = useState<FoodGroups>()
  const [foodSearch, setFoodSearch] = useState<string>("")


  /**
   * Initial data querying for when user first visits dashboard
   */
  useEffect(() => {
    if (!accessToken) {
      return
    }

    getUserFood({ limit: ROWS_PER_PAGE, pageNumber: 0, token: accessToken})
      .then(({foods, count}) => {
        setFood(foods)
        setTotalFoodCount(count)
      }).catch(err => {
        console.error(err)
      })
  }, [accessToken]);

  /**
   *
   * Updates the food data table with the page that was selected
   */
  async function onPageChange(page: number) {

    setPageSelected(page)
    await queryFoodData({
      pageNumber: page,
      foodGroup: foodGroupFilter,
      foodSearchName: foodSearch,
      accessToken: accessToken
    })
  }

  /**
   *
   * Deals with managing a change when a checkbox is checked/unchecked. Updates the checkboxes that are currently checked
   */
  function handleCheckChange(id: number) {
    const updatedFoodCheckState = new Map(foodsChecked)
    if (updatedFoodCheckState.get(id)) {
      updatedFoodCheckState.delete(id)
    } else {
      updatedFoodCheckState.set(id, true)

    }

    if (updatedFoodCheckState.size === foods?.length && selectAllCheckBoxRef.current !== null) {
      selectAllCheckBoxRef.current.checked = true;
    } else if (selectAllCheckBoxRef.current !== null) {
      selectAllCheckBoxRef.current.checked = false
    }

    setFoodsChecked(updatedFoodCheckState)
  }

  /**
   *
   * Deals with checking and unchecking all the checkboxes when the checkall checkbox is checked/unchecked.
   * Updates the checkboxes that are currently checked
   */
  function handleSelectDeselectAll(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      const allChecked = new Map(foods?.map(({ id }) => [id, true] ))
      setFoodsChecked(allChecked)
    } else {
      setFoodsChecked(new Map())
    }
  }

  /**
   *
   * Filters the food data based on the food group that is selected
   */
  async function handleFilterSelect(event: ChangeEvent<HTMLSelectElement>) {
    setFoodGroupFilter(event.target.value.toUpperCase() as FoodGroups)

    setPageSelected(0)
    await queryFoodData({
      pageNumber: 0,
      foodGroup: event.target.value.toUpperCase() as FoodGroups,
      foodSearchName: foodSearch,
      accessToken: accessToken
    })
  }

  /**
   * Deletes the foods that are checked from the database
   */
  async function handleDeleteFood() {
    try {

      const foodIds = Array.from(foodsChecked.keys())
      await deleteFood({foodIds: foodIds, token: accessToken})
      setPageSelected(0)
      await queryFoodData({
        pageNumber: 0,
        foodGroup: foodGroupFilter,
        foodSearchName: foodSearch,
        accessToken: accessToken
      })
      
    } catch (err) {
      console.error(err)
    }
    
  }

  let filterFoodSearchTimeout: ReturnType<typeof setTimeout>
  /**
   * Filters the food data based on the search query
   */
  function handleFoodSearch(event: ChangeEvent<HTMLInputElement>) {
    try {
      clearTimeout(filterFoodSearchTimeout)

      filterFoodSearchTimeout = setTimeout(async () => {
        setFoodSearch(event.target.value)
        await queryFoodData({
          pageNumber: 0,
          foodGroup: foodGroupFilter,
          foodSearchName: event.target.value,
          accessToken: accessToken
        })
      }, 500)

    } catch (err) {
      console.error(err)
    }
  }

  /**
   *
   * Get all the food data and sets the data into the usestate variables
   */
  async function queryFoodData({ pageNumber, foodGroup, foodSearchName, accessToken }:
    {pageNumber: number, foodGroup: FoodGroups | undefined, foodSearchName?: string | null, accessToken: string | null}) {
    const {foods, count} = await getUserFood({
      limit: ROWS_PER_PAGE,
      pageNumber: pageNumber,
      foodGroup: foodGroup,
      foodName: foodSearchName,
      token: accessToken
    })
    setFood(foods)
    setTotalFoodCount(count)
    setFoodsChecked(new Map())
    if (selectAllCheckBoxRef.current) {

      selectAllCheckBoxRef.current.checked = false
    }
  }

  async function addFood({ newFoods }: {newFoods: FoodRequestDto[]}) {
    try {
      await addFoodForUser({foods: newFoods, token: accessToken})
      await queryFoodData({
        pageNumber: pageSelected,
        foodGroup: foodGroupFilter,
        foodSearchName: foodSearch,
        accessToken: accessToken
      })
    } catch (err) {
      console.log(err)
    }
  }



  return (
    <div className="table">
      <TableSettings addFood={addFood} />
      <div className="table__filter">
        <div>

          <SearchBar onChange={handleFoodSearch} placeholder={"Search"}/>

          <Select onChange={handleFilterSelect} placeholder="Filter">
            {

              Object.values(FoodGroups).map(option => {
                return <option key={option} value={option}>{option}</option>
              })
            }
          </Select>

          <Dropdown placeholder="Choose Action">
            <DropdownMenuOption onClick={handleDeleteFood} option="Delete" danger />
          </Dropdown>

        </div>


          <Pagination
            handlePageChange={onPageChange}
            pageSelected={pageSelected}
            numberOfPages={Math.ceil(totalFoodCount / ROWS_PER_PAGE)}
            totalItems={totalFoodCount}
          />




      </div>


      <TableData
        foods={foods}
        foodsChecked={foodsChecked}
        handleCheckChange={handleCheckChange}
        handleSelectDeselectAll={handleSelectDeselectAll}
        selectAllCheckBoxRef={selectAllCheckBoxRef}
      />
      <div className="table__footer">

        <Pagination
          handlePageChange={onPageChange}
          pageSelected={pageSelected}
          numberOfPages={Math.ceil(totalFoodCount / ROWS_PER_PAGE)}
          totalItems={totalFoodCount}
        />
      </div>



    </div>
  )

}

export default Table