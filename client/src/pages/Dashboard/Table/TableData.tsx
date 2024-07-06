import Text from "../../../Components/Text/Text.tsx";
import {Food} from "../../../dto/FoodResponse.tsx";
import {ChangeEvent, RefObject} from "react";

function TableData({
  foodsChecked,
  handleCheckChange,
  handleSelectDeselectAll,
  selectAllCheckBoxRef,
  foods
}: {
  foodsChecked: Map<number, boolean>,
  handleCheckChange: (id: number) => void,
  handleSelectDeselectAll: (event: ChangeEvent<HTMLInputElement>) => void,
  selectAllCheckBoxRef: RefObject<HTMLInputElement>,
  foods: Food[] | undefined
}) {

  return (
    <>
      <table className="table__data">


        <thead>
        <tr>
          <th className="th__checkbox"><input ref={selectAllCheckBoxRef} onChange={handleSelectDeselectAll}
                                              type="checkbox"/></th>
          <th><Text bold>Name</Text></th>
          <th><Text bold>Food Group</Text></th>
          <th><Text bold>Expiry Date</Text></th>
        </tr>
        </thead>
        <tbody>
        {
          foods?.map(food => {
            return (

              <tr key={food.id} style={foodsChecked.get(food.id) ? {backgroundColor: "lightblue"} : {}}>
                <td><input onChange={() => handleCheckChange(food.id)} checked={!!foodsChecked.get(food.id)}
                           type="checkbox"/></td>
                <td><Text>{food.name}</Text></td>
                <td><Text>{food.foodGroup}</Text></td>
                <td><Text>{food.expiryDate}</Text></td>
              </tr>
            )
          })
        }

        </tbody>

      </table>
  </>
  )
}

export default TableData