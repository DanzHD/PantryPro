import "./_table.scss"
import Text from "../../Components/Text/Text.tsx";
import SearchBar from "../../Components/SearchBar/SearchBar.tsx";
import Select from "../../Components/SelectInput/Select.tsx";
import foodGroup from "../../enum/foodGroups.tsx";
import TableSettings from "./TableSettings.tsx";

import { Food } from "../../dto/FoodResponse.tsx";
import {useAuthContext} from "../../Context/AuthContext/useAuthContext.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {getUserFood, getUserFoodCount} from "../../api/food.tsx";
import cx from "classnames";

const ROWS_PER_PAGE = 10

function Table() {
  const {accessToken} = useAuthContext()

  const [foods, setFood] = useState<Food[] | undefined>()
  const [foodCount, setFoodCount] = useState(0)
  const [pageSelected, setPageSelected] = useState(0)
  const [foodsChecked, setFoodsChecked] = useState(new Map<number, boolean>())



  useEffect(() => {

    getUserFoodCount({ token: accessToken})
      .then(foodCount => {
        if (!foodCount) {
          setFoodCount(0)
          return
        }
        setFoodCount(foodCount)
      })


    getUserFood({ limit: ROWS_PER_PAGE, pageNumber: 0, token: accessToken})
      .then(foods => {
        setFood(foods)
      })
  }, [accessToken]);
  function onPageChange(page: number) {
    getUserFood({ limit: ROWS_PER_PAGE, pageNumber: page, token: accessToken})
      .then(foods => {
        setFood(foods)
      })
    setPageSelected(page)
  }

  function handleCheckChange(id: number) {
    const updatedFoodCheckState = new Map(foodsChecked)
    if (updatedFoodCheckState.get(id)) {
      updatedFoodCheckState.delete(id)
    } else {
      updatedFoodCheckState.set(id, true)
    }
    setFoodsChecked(updatedFoodCheckState)
  }

  function handleSelectDeselectAll(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      const allChecked = new Map(foods?.map(({ id }) => [id, true] ))
      setFoodsChecked(allChecked)
    } else {
      setFoodsChecked(new Map())
    }
  }





  return (
    <div className="table">
      <TableSettings />

      <div className="table__filter">
        <div>

          <SearchBar placeholder={"Search"}/>
          <Select options={Object.values(foodGroup)}/>
          <div className="search-icon__container">
            <span className="material-symbols-outlined">
              search
            </span>
          </div>
        </div>
        <div className="pagination">
          {
            pageSelected !== 0 &&
              <div onClick={() => onPageChange(pageSelected - 1)} className="material-symbols-outlined pagination__index">arrow_back</div>
          }

          {
            [...Array(Math.ceil(foodCount / ROWS_PER_PAGE)).keys()].map(i => {
              return (
                <div key={i} onClick={() => onPageChange(i)} className={cx("pagination__index", {"selected": pageSelected === i})}>
                  <Text>{i+1}</Text>
                </div>
              )
            })
          }
          {
            pageSelected !== (Math.ceil(foodCount / ROWS_PER_PAGE) - 1) &&
              <div onClick={() => onPageChange(pageSelected + 1)} className="material-symbols-outlined pagination__index">chevron_right</div>
          }
        </div>

      </div>


      <table className="table__data">


        <thead>
          <tr>
            <th className="th__checkbox"><input onChange={handleSelectDeselectAll} type="checkbox"/></th>
            <th><Text bold>Name</Text></th>
            <th><Text bold>Quantity</Text></th>
            <th><Text bold>Food Group</Text> </th>
            <th><Text bold>Expiry Date</Text></th>
          </tr>
        </thead>
        <tbody>
          {
            foods?.map(food => {
              return (

                <tr key={food.id} style={foodsChecked.get(food.id) ? {backgroundColor: "lightblue"} : {}}>
                  <td><input onChange={() => handleCheckChange(food.id)} checked={!!foodsChecked.get(food.id)} type="checkbox"/></td>
                  <td><Text>{food.name}</Text></td>
                  <td><Text>{food.quantity}</Text></td>
                  <td><Text>{food.foodGroup}</Text></td>
                  <td><Text>{food.expiryDate}</Text></td>
                </tr>
              )
            })
          }

        </tbody>

      </table>

    </div>
  )

}

export default Table