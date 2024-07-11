import Header from "../Dashboard/Header/Header.tsx";
import {Page} from "../../enum/Pages.tsx";
import Body from "./Body.tsx";
import "./_mealPlanner.scss"

function MealPlanner() {

  return <>
    <div className="meal-planner">

      <Header pageSelected={Page.MEAL} />
      <Body />
    </div>
  </>
}

export default MealPlanner