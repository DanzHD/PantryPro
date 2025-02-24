import Text from "../../Components/Text/Text.tsx";
import "./_recipe.scss"
export function Recipe() {

    return (
        <div className="meal-generator__body__content__recipe">
            <div>

                <Text centered heading>Recipe</Text>
            </div>
            <div className="meal-generator__body__content__recipe__body">
                <Text>
                </Text>
            </div>

        </div>
    )
}