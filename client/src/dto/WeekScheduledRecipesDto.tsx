import {RecipeDto} from "./RecipeDto.tsx";

export interface WeekScheduledRecipesDto {
  mondayRecipes: RecipeDto[]
  tuesdayRecipes: RecipeDto[]
  wednesdayRecipes: RecipeDto[]
  thursdayRecipes: RecipeDto[]
  fridayRecipes: RecipeDto[]
  saturdayRecipes: RecipeDto[]
  sundayRecipes: RecipeDto[]

}
