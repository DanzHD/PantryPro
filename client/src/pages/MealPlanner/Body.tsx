import Text from "../../Components/Text/Text.tsx";
import Input from "../../Components/Input/Input.tsx";
import "./_body.scss"
import DaysOfTheWeek from "../../enum/DaysOfTheWeek.tsx";
import useModal from "../../hooks/useModal/useModal.tsx";
import {useRef, useState} from "react";
import AddRecipeModal from "./AddRecipeModal.tsx";

export class Recipe {
  id: number
  name: string
  ingredients: string[]
  instructions: string
  image: string | null

  constructor(id: number, name: string, ingredients: string[], instructions: string, image: string | null) {
    this.id = id
    this.name = name
    this.ingredients = ingredients
    this.instructions = instructions
    this.image = image
  }

}

function Body() {
  const [recipes, setRecipes] = useState(new Map<DaysOfTheWeek, Recipe[]>())
  const [addRecipeForDay, setAddRecipeForDay] = useState<DaysOfTheWeek>(DaysOfTheWeek.MONDAY)

  const addRecipeModalRef = useRef(null)

  function handleOpenAddRecipeModal(day: DaysOfTheWeek) {
    if (!addRecipeModalRef.current) {
      return
    }

    const dialog: HTMLDialogElement = addRecipeModalRef.current as HTMLDialogElement
    setAddRecipeForDay(day)
    dialog.showModal()

  }

  return (
    <>

      <div className="meal-planner__body">
        <div className="meal-planner__body__content">
          <div className="meal-planner__body__content__title">

            <Text heading centered>Meal Planner</Text>
            <Input type="date" />
          </div>
          <div className="weekly-meals-section">
            <MealsDay day={DaysOfTheWeek.MONDAY} handleOpenAddRecipeModal={handleOpenAddRecipeModal} />
            <MealsDay day={DaysOfTheWeek.TUESDAY} handleOpenAddRecipeModal={handleOpenAddRecipeModal} />
            <MealsDay day={DaysOfTheWeek.WEDNESDAY} handleOpenAddRecipeModal={handleOpenAddRecipeModal} />
            <MealsDay day={DaysOfTheWeek.THURSDAY} handleOpenAddRecipeModal={handleOpenAddRecipeModal} />
            <MealsDay day={DaysOfTheWeek.FRIDAY} handleOpenAddRecipeModal={handleOpenAddRecipeModal} />
            <MealsDay day={DaysOfTheWeek.SATURDAY} handleOpenAddRecipeModal={handleOpenAddRecipeModal} />
            <MealsDay day={DaysOfTheWeek.SUNDAY} handleOpenAddRecipeModal={handleOpenAddRecipeModal} />

          </div>
        </div>

      </div>

      <AddRecipeModal day={addRecipeForDay} currentRecipes={recipes} setCurrentRecipe={setRecipes} modalRef={addRecipeModalRef} />

    </>
  )

}

/**
 *
 * Creates a card which contains 3 cards for breakfast, lunch and dinner
 */
function MealsDay({
  day,
  recipes,
  handleOpenAddRecipeModal
}: {
  day: DaysOfTheWeek,
  meals?: Recipe[],
  handleOpenAddRecipeModal: ((day: DaysOfTheWeek) => void)
}) {
  const openMealActionsRef = useRef<HTMLDivElement>(null)
  const {open} = useModal(openMealActionsRef)



  return <>
    <div className="day-meal">
      <div className="day-meal__title">

        <Text subheading centered>{day}</Text>
        <span ref={openMealActionsRef} className="material-symbols-outlined">
          more_vert
        </span>
        <div className="menu-container">
          {
            open &&
              <ul className="menu-meal">
                <li onClick={() => handleOpenAddRecipeModal(day)}>
                  <span className="material-symbols-outlined">add</span>
                  <Text>Add Meal</Text>
                </li>
              </ul>
          }
        </div>
      </div>

    </div>

  </>
}

export default Body