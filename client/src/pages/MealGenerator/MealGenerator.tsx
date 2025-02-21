import Header from "../Dashboard/Header/Header.tsx";
import {Page} from "../../enum/Pages.tsx";

export function MealGenerator() {


    return (
        <div className="meal-generator">
            <Header pageSelected={Page.MEAL_GENERATOR} />

        </div>
    )
}