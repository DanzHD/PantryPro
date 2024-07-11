import Header from "../Dashboard/Header/Header.tsx";
import {Page} from "../../enum/Pages.tsx";

function MealPlanner() {

  return <>
    <Header pageSelected={Page.MEAL} />
  </>
}

export default MealPlanner