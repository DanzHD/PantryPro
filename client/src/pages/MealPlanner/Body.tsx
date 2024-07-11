import Text from "../../Components/Text/Text.tsx";
import Input from "../../Components/Input/Input.tsx";
import "./_body.scss"
import DaysOfTheWeek from "../../enum/DaysOfTheWeek.tsx";
import useModal from "../../hooks/useModal/useModal.tsx";
import {useRef} from "react";


function Body() {

  return (
    <>

      <div className="meal-planner__body">
        <div className="meal-planner__body__content">
          <div className="meal-planner__body__content__title">

            <Text heading centered>Meal Planner</Text>
            <Input type="date" />
          </div>
          <div className="weekly-meals-section">
            <MealsDay day={DaysOfTheWeek.MONDAY} />
            <MealsDay day={DaysOfTheWeek.TUESDAY} />
            <MealsDay day={DaysOfTheWeek.WEDNESDAY} />
            <MealsDay day={DaysOfTheWeek.THURSDAY} />
            <MealsDay day={DaysOfTheWeek.FRIDAY} />
            <MealsDay day={DaysOfTheWeek.SATURDAY} />
            <MealsDay day={DaysOfTheWeek.SUNDAY} />

          </div>
        </div>

      </div>
    </>
  )

}

/**
 *
 * Creates a card which contains 3 cards for breakfast, lunch and dinner
 */
function MealsDay({
  day
}: {
  day: DaysOfTheWeek
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
                <li>
                  <span className="material-symbols-outlined">add</span>
                  <Text>Add Meal</Text>
                </li>
              </ul>
          }
        </div>
      </div>
      <div className="meal">
        Break
      </div>
      <div className="meal">
        Lunch
      </div>
      <div className="meal">
        Dinner
      </div>
    </div>
  </>
}

export default Body