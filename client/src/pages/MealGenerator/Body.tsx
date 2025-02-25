import {Ingredients} from "./Ingredients.tsx";
import {Recipe} from "./Recipe.tsx";
import {useState} from "react";
import {generateRecipe} from "../../api/ai.tsx";
import {useAuthContext} from "../../Context/AuthContext/useAuthContext.tsx";


export function Body() {
    const [recipe, setRecipe] = useState("")
    const { accessToken } = useAuthContext()
    async function handleGenerateRecipe({ ingredients }: { ingredients: string[] }) {
        if (!accessToken) {
            return
        }
        const { recipe } = await generateRecipe({ ingredients, accessToken })
        console.log(recipe)
        setRecipe(recipe)
    }

    return (
        <div className="meal-generator__body">
            <div className="meal-generator__body__content">
                <Ingredients handleGenerateRecipe={handleGenerateRecipe} />
                <Recipe recipe={recipe} />

            </div>
        </div>
    )
}