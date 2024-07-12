export interface MealsResponse {
  meals: Meal[]
}

interface Meal {
  idMeal: number,
  strMeal: string,
  strInstructions: string,
  strIngredient1: string | null,
  strIngredient2: string | null,
  strIngredient3: string | null,
  strIngredient4: string | null,
  strIngredient5: string | null,
  strIngredient6: string | null,
  strIngredient7: string | null,
  strIngredient8: string | null,
  strIngredient9: string | null,
  strIngredient10: string | null,
  strIngredient11: string | null,
  strIngredient12: string | null,
  strIngredient13: string | null,
  strIngredient14: string | null,
  strIngredient15: string | null,
  strIngredient16: string | null,
  strIngredient17: string | null,
  strIngredient18: string | null,
  strIngredient19: string | null,
  strIngredient20: string | null
  strMealThumb: string | null
}