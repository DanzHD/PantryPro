import DaysOfTheWeek from "../../enum/DaysOfTheWeek.tsx";
import {Recipe} from "./Body.tsx";
import React, {RefObject, useState} from "react";
import Modal from "../../Components/Modal/Modal.tsx";
import Text from "../../Components/Text/Text.tsx";
import "./_addRecipeModal.scss"
import SearchBar, {Item} from "../../Components/SearchBar/SearchBar.tsx";
import {getMeal, scheduleNewMeals} from "../../api/meal.tsx";
import {useAuthContext} from "../../Context/AuthContext/useAuthContext.tsx";
import moment from "moment";
import {ScheduleMealsDto} from "../../dto/ScheduleMealsDto.tsx";
import {RecipeDto} from "../../dto/RecipeDto.tsx";

function AddRecipeModal({
  day,
  currentRecipes,
  setCurrentRecipes,
  modalRef,
  week


}: {
  day: DaysOfTheWeek,
  currentRecipes: Map<DaysOfTheWeek, Map<number, Recipe>>,
  setCurrentRecipes: React.Dispatch<React.SetStateAction<Map<DaysOfTheWeek, Map<number, Recipe>>>>,
  modalRef: RefObject<HTMLDialogElement>,
  week: string

}) {
  const {accessToken} = useAuthContext();

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

        // @ts-ignore
        const ingredient: string | null  = meal[`strIngredient${i.toString()}`]
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

  /**
   * Event handler when the user clicks the done button to finish off adding items
   */
  async function handleFinishAddingFood() {
    const newMeals: Map<DaysOfTheWeek, Map<number, Recipe>> = new Map(currentRecipes)
    const mealsOnDay: Map<number, Recipe> = newMeals.get(day) as Map<number, Recipe>
    newMeals.set(day, new Map([...Array.from(mealsOnDay.entries()), ...selectedRecipes]))

    setCurrentRecipes(newMeals)

    handleCloseModal()
    await saveNewScheduledMeals();


  }

  /**
   * Gets all the selected meals and saves it to the database on the date specified
   */
  async function saveNewScheduledMeals() {
    const [year, weekInYear] = week.split("-W")

    /* Week starts on Sunday in momentJs, add seven to fix up Sunday */
    let date = moment(`${year}W${weekInYear}`).day(day)
    if (day === DaysOfTheWeek.SUNDAY) {
      date = date.add("7", 'days')
    }
    const strDate: string = date.format("YYYY-MM-DD")
    const recipeDto: RecipeDto[] = []
    Array.from(selectedRecipes.values()).forEach(recipe => {
      recipeDto.push(new RecipeDto(recipe.id, recipe.ingredients, recipe.instructions, recipe.image, recipe.name))
    })


    const scheduleMealsDto = new ScheduleMealsDto(strDate, recipeDto)

    await scheduleNewMeals({ accessToken, scheduleMealsDto })
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