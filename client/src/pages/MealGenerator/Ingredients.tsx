import Text from "../../Components/Text/Text.tsx";
import "./_ingredients.scss"
import SearchBar, {Item} from "../../Components/SearchBar/SearchBar.tsx";
import React, {useState} from "react";
import {getIngredientList} from "../../api/ingredient.tsx";
import {useAuthContext} from "../../Context/AuthContext/useAuthContext.tsx";

export function Ingredients() {
    const { accessToken } = useAuthContext();
    const [ingredientsSearched, setIngredientsSearched] = useState<Map<string, Item>>(new Map())
    const [ingredientsSelected, setIngredientsSelected] = useState<Map<string, Item>>(new Map())

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
        console.log(newIngredientsSearched)
        setIngredientsSearched(newIngredientsSearched)

    }

    const handleIngredientSelection = (ingredient: Item) => {
        const newIngredientsSelected = new Map(ingredientsSelected)
        newIngredientsSelected.set(ingredient.id.toString(), ingredient)
        setIngredientsSelected(newIngredientsSelected)

        const newIngredientsSearched = new Map(ingredientsSearched)
        newIngredientsSearched.delete(ingredient.name)
        setIngredientsSearched(newIngredientsSearched)
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

            />
            <div className="meal-generator__body__content__ingredients__selected-ingredients">
                {
                    Array.from(ingredientsSelected.values()).map(ingredient => {

                        return <div key={ingredient.id} className="ingredient">{ingredient.name}</div>


                    })
                }
            </div>

        </div>
    )

}

