import {Ingredients} from "./Ingredients.tsx";
import {Recipe} from "./Recipe.tsx";


export function Body() {

    return (
        <div className="meal-generator__body">
            <div className="meal-generator__body__content">
                <Ingredients />
                <Recipe />

            </div>
        </div>
    )
}