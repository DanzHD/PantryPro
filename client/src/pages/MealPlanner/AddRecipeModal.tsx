import DaysOfTheWeek from "../../enum/DaysOfTheWeek.tsx";
import {Recipe} from "./Body.tsx";
import React, {RefObject, useState} from "react";
import Modal from "../../Components/Modal/Modal.tsx";
import Text from "../../Components/Text/Text.tsx";
import "./_addRecipeModal.scss"
import SearchBar, {Item} from "../../Components/SearchBar/SearchBar.tsx";
import {getMeal} from "../../api/meal.tsx";

function AddRecipeModal({
  day,
  currentRecipes,
  setCurrentRecipes,
  modalRef,
  date
}: {
  day: DaysOfTheWeek,
  currentRecipes: Map<DaysOfTheWeek, Recipe[]>,
  setCurrentRecipes: React.Dispatch<React.SetStateAction<Map<DaysOfTheWeek, Recipe[]>>>,
  modalRef: RefObject<HTMLDialogElement>,
  date: Date
}) {

  const [recipesQueried, setRecipesQueried] = useState<Recipe[]>([])
  const [selectedRecipes, setSelectedRecipes] = useState<Map<number, Recipe>>(new Map<number, Recipe>())
  function handleCloseModal() {
    if (!modalRef || !modalRef.current) {
      return
    }
    setRecipesQueried([])
    setSelectedRecipes(new Map())
    modalRef.current.close()
  }

  async function handleSearchBarChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target || !e.target.value) {
      setRecipesQueried([])
      return
    }
    const meal: string = e.target.value
    const {meals} = await getMeal({meal: meal})
    const recipes: Recipe[] = meals.filter(meal => !selectedRecipes.get(meal.idMeal))
      .map(meal => {


      const ingredients: string[] = []
      for (let i = 1; i <= 20; i++) {
        const ingredient: string | null = meal[`strIngredient${i.toString()}`]
        if (ingredient) {
          ingredients.push(ingredient)
        }
      }

      return new Recipe(meal.idMeal, meal.strMeal, ingredients, meal.strInstructions, meal.strMealThumb)
    })
    setRecipesQueried(recipes)
  }

  function handleRecipeSelect(recipe: Item) {
    if (recipe instanceof Recipe) {
      const newRecipes = new Map(selectedRecipes).set(recipe.id, recipe)
      const newRecipesQueried = recipesQueried.filter(recipe2 => !(recipe.id === recipe2.id))

      setRecipesQueried(newRecipesQueried)
      setSelectedRecipes(newRecipes)

    }
  }

  function handleRemoveSelectedRecipe(id: number) {
    const newSelectedRecipes = new Map(selectedRecipes)
    newSelectedRecipes.delete(id)
    setSelectedRecipes(newSelectedRecipes)
  }

  function handleFinishAddingFood() {
    const newMeals: Map<DaysOfTheWeek, Recipe[]> = new Map(currentRecipes)
    if (!newMeals.get(day)) {
      newMeals.set(day, Array.from(selectedRecipes.values()))
    } else if (newMeals.get(day) !== undefined) {
      const recipes: Recipe[] = newMeals.get(day) as Recipe[]
      newMeals.set(day, [...recipes, ...Array.from(selectedRecipes.values())])
    }
    setCurrentRecipes(newMeals)
    handleCloseModal()

  }

  return <>
    <Modal modalRef={modalRef}>
      <div className="add-recipe-modal">

        <div className="add-recipe__header">

          <span onClick={handleCloseModal} className="material-symbols-outlined">close</span>
          <Text heading>{day}</Text>
          <span className="material-symbols-outlined" onClick={handleFinishAddingFood}>done</span>
        </div>
        <div>

          <SearchBar
            handleSelectItem={handleRecipeSelect}
            dropdownItems={recipesQueried}
            fullWidth
            onChange={handleSearchBarChange}
            placeholder="Search for Recipe"
          />
        </div>
        <div className="selected-recipe-list">

          {
            Array.from(selectedRecipes.values()).map(recipe => {
              return <div className="selected-recipe" key={recipe.id}>

                <div className="selected-recipe__image">

                  <img src={recipe.image ? recipe.image : ""} alt={recipe.name}/>
                </div>
                <Text subheading ellipsis>{recipe.name}</Text>
                <div className="material-symbols-outlined" onClick={() => handleRemoveSelectedRecipe(recipe.id)}>close</div>
              </div>
            })
          }
        </div>


      </div>
    </Modal>
  </>
}

export default AddRecipeModal