import Text from "../../Components/Text/Text.tsx";
import "./_ingredients.scss"
import SearchBar, {Item} from "../../Components/SearchBar/SearchBar.tsx";
import React, {useState} from "react";
import {getIngredientList} from "../../api/ingredient.tsx";
import {useAuthContext} from "../../Context/AuthContext/useAuthContext.tsx";
import Button from "../../Components/Button/Button.tsx";
import Spinner from "../../Components/Spinner/Spinner.tsx";

export function Ingredients({
    handleGenerateRecipe
}: {
    handleGenerateRecipe: ({ ingredients }: { ingredients: string[] }) => void
}) {
    const { accessToken } = useAuthContext();
    const [ingredientsSearched, setIngredientsSearched] = useState<Map<string, Item>>(new Map())
    const [ingredientsSelected, setIngredientsSelected] = useState<Map<string, Item>>(new Map())
    const [loading, setLoading] = useState(false)

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target || !e.target.value || !accessToken) {
            setIngredientsSearched(new Map())
            return
        }

        const ingredient: string = e.target.value

        const { ingredients } = await getIngredientList({ ingredient, token: accessToken })
        const ingredientItems: Item[] = ingredients.map(ingredient => {
            return {
                "name": ingredient.name,
                "id": ingredient.name,
            }
        })

        const newIngredientsSearched = new Map()
        for (const ingredient of ingredientItems) {
            if (ingredientsSelected.has(ingredient.name)) {
                continue
            }
            newIngredientsSearched.set(ingredient.name, ingredient)
        }
        setIngredientsSearched(newIngredientsSearched)

    }

    async function handleRecipeGeneration() {
        setLoading(true)
        const ingredients = Array.from(ingredientsSelected.values()).map(item => item.name);
        await handleGenerateRecipe({ingredients})

        setLoading(false)
    }



    const handleIngredientSelection = (ingredient: Item) => {
        const newIngredientsSelected = new Map(ingredientsSelected)
        newIngredientsSelected.set(ingredient.id.toString(), ingredient)
        setIngredientsSelected(newIngredientsSelected)

        const newIngredientsSearched = new Map(ingredientsSearched)
        newIngredientsSearched.delete(ingredient.name)
        setIngredientsSearched(newIngredientsSearched)
    }

    const handleDeselectIngredient = (ingredient: Item) => {
        const newIngredientsSelected = new Map(ingredientsSelected)
        newIngredientsSelected.delete(ingredient.id.toString())
        setIngredientsSelected(newIngredientsSelected)


    }

    return (
        <div className="meal-generator__body__content__ingredients">
            <Text heading>Select Ingredients</Text>
            <SearchBar
                fullWidth
                placeholder="Enter Ingredients"
                onChange={handleSearchChange}
                dropdownItems={Array.from(ingredientsSearched.values())}
                handleSelectItem={handleIngredientSelection}
                noItemsMessage="No ingredients found"

            />
            <div className="meal-generator__body__content__ingredients__selected-ingredients">
                {
                    Array.from(ingredientsSelected.values()).map(ingredient => {

                        return <div
                            onClick={() => handleDeselectIngredient(ingredient)}
                            key={ingredient.id} className="ingredient">
                            <Text>

                                {ingredient.name}
                            </Text>
                            <div className="material-symbols-outlined">
                                close
                            </div>
                        </div>


                    })
                }
            </div>
            <Button onClick={handleRecipeGeneration}>
                {
                    loading ?
                        <Spinner small /> :

                        <div>Generate Recipe</div>

                }

            </Button>

        </div>
    )

}

