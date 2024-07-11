import {FormEvent, RefObject, useRef, useState} from "react";
import Text from "../../../Components/Text/Text.tsx";
import "./_addFoodModalContainer.scss"
import Input from "../../../Components/Input/Input.tsx";
import Select from "../../../Components/SelectInput/Select.tsx";
import Button from "../../../Components/Button/Button.tsx";
import FoodGroups from "../../../enum/foodGroups.tsx";
import FoodRow from "./FoodRow.tsx";
import foodGroups from "../../../enum/foodGroups.tsx";
import {FoodRequestDto} from "../../../dto/FoodRequestDto.tsx";


export interface NewFood {
  name: string,
  foodGroup: FoodGroups,
  expiryDate: Date
}

function AddFoodModal({
  modalRef,
  addFood
}: {
  modalRef: RefObject<HTMLDialogElement>,
  addFood: ({  newFoods }: { newFoods: FoodRequestDto[]}) => void
}) {
  const [newFoods, setNewFoods] = useState<NewFood[]>([])
  const addFormRef = useRef<HTMLFormElement>(null)

  function handleModalClose() {

    if (!modalRef.current) {
      return
    }

    modalRef?.current.close()
    setNewFoods([])
    if (!addFormRef.current) {
      return
    }
    addFormRef.current.foodName.value = ""
    addFormRef.current.expiryDate.value = ""
  }

  function handleAddFood(e: FormEvent) {
    e.preventDefault()
    const updatedNewFoods = [...newFoods]

    const target = e.target as HTMLFormElement

    const foodName = target['foodName'].value
    const foodGroup = target['group'].value
    const expiryDate = target['expiryDate'].value
    const food: NewFood = {
      name: foodName,
      foodGroup: foodGroup,
      expiryDate: new Date(expiryDate)
    }
    updatedNewFoods.push(food)
    setNewFoods(updatedNewFoods)

  }

  function handleRemoveFoodRow(index: number) {
    const updatedNewFoods = [...newFoods]
    updatedNewFoods.splice(index, 1)
    setNewFoods(updatedNewFoods)
  }

  async function handleAddFoodToDatabase() {
    const foodRequestDto: FoodRequestDto[] = newFoods.map(food => {
      const date = food.expiryDate
      const foodRequestDto: FoodRequestDto = {
        "expiryDate": `${date.getFullYear()}-${('0' + date.getMonth()).slice(-2)}-${('0' + date.getDate()).slice(-2)}`,
        "group": food.foodGroup.toUpperCase(),
        "name": food.name
      } 
      
      return foodRequestDto
    })


    addFood({newFoods: foodRequestDto})

    handleModalClose()
  }




  return (
    <div className="add-food-container">
      <div className="add-food-container__header">

        <span className="material-symbols-outlined close" onClick={handleModalClose}>close</span>
        <Text heading>Add Food</Text>
        <span className="material-symbols-outlined done" onClick={handleAddFoodToDatabase}>check</span>
      </div>
      <form ref={addFormRef} onSubmit={handleAddFood} className="add-food-container__form">
        <div className="input-group">

          <label>
            <Text bold>Food Name </Text>
          </label>
          <Input name="foodName" type="text" placeholder="Enter food name" fullWidth required />
        </div>

        <div className="input-group">

          <label><Text bold>Food Group</Text></label>
          <Select disabled={true} name="group" placeholder="Food Group">
            {
              Object.values(foodGroups).map(foodGroup => {
                return <option value={foodGroup} key={foodGroup}>{foodGroup}</option>
              })
            }

          </Select>
        </div>
        <div className="input-group">
          <label><Text bold>Expiry Date</Text></label>
          <Input name="expiryDate" type="date" placeholder="Enter expiry date" required />
        </div>
        <Button fullWidth>Add</Button>
      </form>

      <div className="added-items">
        {
          newFoods.map((food, i) => {
            return <FoodRow removeRow={() => handleRemoveFoodRow(i)} key={i} name={food.name} foodGroup={food.foodGroup} expiryDate={food.expiryDate} />
          })
        }

      </div>


    </div>
  )

}

export default AddFoodModal