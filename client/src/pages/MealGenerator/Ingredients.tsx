import Text from "../../Components/Text/Text.tsx";
import "./_ingredients.scss"
import SearchBar, {Item} from "../../Components/SearchBar/SearchBar.tsx";
import {useState} from "react";

export function Ingredients() {

    const [ingredientsSearched, setIngredientsSearched] = useState<Map<number, Item>>(new Map())
    const [ingredientsSelected, setIngredientsSelected] = useState<Map<number, Item>>(new Map())

    const handleSearchChange = async () => {
        //todo connect to external database
        const ingredients = new Map<number, Item>()
        ingredients.set(12312, {
            id: 12312,
            name: "salt"
        })
        ingredients.set(212, {
            id: 212,
            name: "sugar"
        })
        setIngredientsSearched(ingredients)


    }

    const handleIngredientSelection = (ingredient: Item) => {
        const newIngredientsSelected = new Map(ingredientsSelected)
        newIngredientsSelected.set(ingredient.id, ingredient)
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
            />
            <div className="meal-generator__body__content__ingredients__selected-ingredients">
                {
                    Array.from(ingredientsSelected.values()).map(ingredient => {

                        return (
                            <>
                                <div key={ingredient.id} className="ingredient">{ingredient.name}</div>

                            </>

                        )
                    })
                }
            </div>

        </div>
    )

}

