import Header from "../Dashboard/Header/Header.tsx";
import {Page} from "../../enum/Pages.tsx";
import {Body} from "./Body.tsx";
import "./_mealGenerator.scss"

export function MealGenerator() {


    return (
        <div className="meal-generator">
            <Header pageSelected={Page.MEAL_GENERATOR} />
            <Body />
        </div>
    )
}