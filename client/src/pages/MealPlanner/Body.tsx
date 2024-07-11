import Text from "../../Components/Text/Text.tsx";
import Input from "../../Components/Input/Input.tsx";
import "./_body.scss"
import DaysOfTheWeek from "../../enum/DaysOfTheWeek.tsx";


function Body() {

  return (
    <>

      <div className="meal-planner__body">
        <div className="meal-planner__body__content">
          <div className="meal-planner__body__content__title">

            <Text heading centered>Meal Planner</Text>
            <Input type="date" />
          </div>
          <div className="weekly-meals__section">
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

  return <>
    <div className="day-meal">
      <Text subheading centered>{day}</Text>
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