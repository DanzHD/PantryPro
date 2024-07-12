import DaysOfTheWeek from "../../enum/DaysOfTheWeek.tsx";
import {Recipe} from "./Body.tsx";
import React, {RefObject, useState} from "react";
import Modal from "../../Components/Modal/Modal.tsx";
import Text from "../../Components/Text/Text.tsx";
import "./_addRecipeModal.scss"
import SearchBar from "../../Components/SearchBar/SearchBar.tsx";
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
  setCurrentRecipe: React.Dispatch<React.SetStateAction<Map<DaysOfTheWeek, Recipe[]>>>,
  modalRef: RefObject<HTMLDialogElement>,
  date: Date
}) {

  const [recipes, setRecipes] = useState<Recipe[]>([])

  function handleCloseModal() {
    if (!modalRef || !modalRef.current) {
      return
    }

    modalRef.current.close()
  }

  async function handleSearchBarChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target || !e.target.value) {
      setRecipes([])
      return
    }
    const meal: string = e.target.value
    const {meals} = await getMeal({meal: meal})
    const recipes: Recipe[] = meals.map(meal => {
      const ingredients: string[] = []
      for (let i = 1; i <= 20; i++) {
        const ingredient: string | null = meal[`strIngredient${i.toString()}`]
        if (ingredient) {
          ingredients.push(ingredient)
        }
      }

      return new Recipe(meal.idMeal, meal.strMeal, ingredients, meal.strInstructions, meal.strMealThumb)
    })
    console.log(recipes)
    setRecipes(recipes)
  }

  return <>
    <Modal modalRef={modalRef}>
      <div className="add-recipe-modal">

        <div className="add-recipe__header">

          <span onClick={handleCloseModal} className="material-symbols-outlined">close</span>
          <Text heading>{day}</Text>
          <span className="material-symbols-outlined">done</span>
        </div>
        <div>

          <SearchBar dropdownItems={recipes} fullWidth onChange={handleSearchBarChange} placeholder="Search for Recipe" />
        </div>


      </div>
    </Modal>
  </>
}

export default AddRecipeModal