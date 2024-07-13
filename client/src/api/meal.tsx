import {apiClient, mealClient} from "./client.tsx";
import {MealsResponse} from "../dto/MealResponse.tsx";
import {ScheduleMealsDto} from "../dto/ScheduleMealsDto.tsx";
import APIError from "../util/APIError.tsx";
import {DeleteScheduledMealDto} from "../dto/DeleteScheduledMealDto.tsx";
import {WeekScheduledRecipesDto} from "../dto/WeekScheduledRecipesDto.tsx";
import {Recipe} from "../pages/MealPlanner/Body.tsx";
import DaysOfTheWeek from "../enum/DaysOfTheWeek.tsx";
import {IngredientObject, RecipeDto} from "../dto/RecipeDto.tsx";


export async function getMeal({meal}: {meal: string}) {
  const res = await mealClient.get<MealsResponse>(`/search.php?s=${meal}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  let {meals} = res.data || []
  if (meals === null) {
    meals = []
  }
  return {meals}

}

export async function scheduleNewMeals({ scheduleMealsDto, accessToken }: {scheduleMealsDto: ScheduleMealsDto, accessToken: string | null}) {
  if (!accessToken) {
    throw new APIError("Invalid access token", 403);
  }


  await apiClient.post("/meal", {
    recipes: scheduleMealsDto.recipes,
    date: scheduleMealsDto.date
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  })


}

export async function deleteScheduledMeal({ accessToken, deleteScheduledMealDto }
  : { accessToken: string | null, deleteScheduledMealDto: DeleteScheduledMealDto}) {
  if (!accessToken) {
    return
  }

  await apiClient.delete("/meal/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      ...deleteScheduledMealDto

    }
  })

}

export async function getWeekOfScheduledMeals({ accessToken, week, year }:
  { accessToken: string | null, week: number, year: number}) {
  if (!accessToken) {
    return
  }

  const searchParam = new URLSearchParams("/meal/week")
  searchParam.set("week", week.toString())
  searchParam.set("year", year.toString())

  const res = await apiClient.get<WeekScheduledRecipesDto>(`/meal/week?week=${week}&year=${year}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  const weekScheduledRecipesDto: WeekScheduledRecipesDto = res.data
  const weeklyRecipes = new Map<DaysOfTheWeek, Map<number, Recipe>>()
  weeklyRecipes.set(DaysOfTheWeek.MONDAY, parseRecipeDtoToRecipeMap(weekScheduledRecipesDto.mondayRecipes));
  weeklyRecipes.set(DaysOfTheWeek.TUESDAY, parseRecipeDtoToRecipeMap(weekScheduledRecipesDto.tuesdayRecipes));
  weeklyRecipes.set(DaysOfTheWeek.WEDNESDAY, parseRecipeDtoToRecipeMap(weekScheduledRecipesDto.wednesdayRecipes));
  weeklyRecipes.set(DaysOfTheWeek.THURSDAY, parseRecipeDtoToRecipeMap(weekScheduledRecipesDto.thursdayRecipes));
  weeklyRecipes.set(DaysOfTheWeek.FRIDAY, parseRecipeDtoToRecipeMap(weekScheduledRecipesDto.fridayRecipes));
  weeklyRecipes.set(DaysOfTheWeek.SATURDAY, parseRecipeDtoToRecipeMap(weekScheduledRecipesDto.saturdayRecipes));
  weeklyRecipes.set(DaysOfTheWeek.SUNDAY, parseRecipeDtoToRecipeMap(weekScheduledRecipesDto.sundayRecipes));

  return weeklyRecipes

}

/**
 *
 * Converts an array of recipeDto into recipes
 */
function parseRecipeDtoToRecipeMap(recipesDto: RecipeDto[]) {
  const recipes: Map<number, Recipe> = new Map<number, Recipe>()
  recipesDto.forEach(recipeDto => {
    const ingredients: string[] = convertIngredientObjectArrayToStringArray(recipeDto.ingredients as unknown as IngredientObject[])
    recipes.set(recipeDto.recipeId,
      new Recipe(
        recipeDto.recipeId,
        recipeDto.name,
        ingredients,
        recipeDto.instructions ? recipeDto.instructions : "",
        recipeDto.imageSource
      ))
  })
  
  return recipes
}

/**
 *
 * Flattens an array of ingredient objects into a list of strings
 */
function convertIngredientObjectArrayToStringArray(ingredients: IngredientObject[]): string[] {
  const strIngredients: string[] = []
  ingredients.forEach(ingredient => {
    strIngredients.push(ingredient.name)
  })
  
  return strIngredients
}