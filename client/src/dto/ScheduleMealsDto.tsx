import {RecipeDto} from "./RecipeDto.tsx";

export class ScheduleMealsDto {

  date: string
  recipes: RecipeDto[]

  constructor(date: string, recipes: RecipeDto[]) {
    this.date = date
    this.recipes = recipes
  }

}