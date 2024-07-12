import Text from "../../Components/Text/Text.tsx";
import Input from "../../Components/Input/Input.tsx";
import "./_body.scss"
import DaysOfTheWeek from "../../enum/DaysOfTheWeek.tsx";
import useModal from "../../hooks/useModal/useModal.tsx";
import {useRef, useState} from "react";
import AddRecipeModal from "./AddRecipeModal.tsx";
import {Item} from "../../Components/SearchBar/SearchBar.tsx";

export class Recipe implements Item {
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
  const [recipes, setRecipes] = useState(new Map<DaysOfTheWeek, Recipe[]>([
    [DaysOfTheWeek.MONDAY, []],
    [DaysOfTheWeek.TUESDAY, []],
    [DaysOfTheWeek.WEDNESDAY, []],
    [DaysOfTheWeek.THURSDAY, []],
    [DaysOfTheWeek.FRIDAY, []],
    [DaysOfTheWeek.SATURDAY, []],
    [DaysOfTheWeek.SUNDAY, []]
  ]))
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
            {
              Object.values(DaysOfTheWeek).map(day => {
                return <MealsDay
                  key={day}
                  day={day}
                  meals={recipes.get(day)}
                  handleOpenAddRecipeModal={handleOpenAddRecipeModal}
                />
              })
            }



          </div>
        </div>

      </div>

      <AddRecipeModal date={new Date()}  day={addRecipeForDay} currentRecipes={recipes} setCurrentRecipes={setRecipes} modalRef={addRecipeModalRef} />

    </>
  )

}

/**
 *
 * Creates a card which contains 3 cards for breakfast, lunch and dinner
 */
function MealsDay({
  day,
  meals,
  handleOpenAddRecipeModal
}: {
  day: DaysOfTheWeek,
  meals: Recipe[] | undefined,
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
      {
        meals &&
          meals.map(meal => {
            return <div key={meal.id} className="meal">
              <div>

                <Text ellipsis bold subheading>{meal.name}</Text>
              </div>
              <img src={meal.image ? meal.image : ""} alt={meal.name}/>
            </div>
          })
      }

    </div>

  </>
}

export default Body