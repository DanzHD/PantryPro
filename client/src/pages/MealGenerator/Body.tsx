import {Ingredients} from "./Ingredients.tsx";


export function Body() {

    return (
        <div className="meal-generator__body">
            <div className="meal-generator__body__content">
                <Ingredients />

                <div className="meal-generator__body__content__recipe">
                </div>
            </div>
        </div>
    )
}