export interface IngredientObject {
  name: string
}

export class RecipeDto {
  recipeId: number
  ingredients: string[] | IngredientObject[]
  instructions: string | null
  imageSource: string | null
  name: string

  constructor(recipeId: number, ingredients: string[], instructions: string | null, imageSource: string | null, name: string) {
    this.recipeId = recipeId
    this.ingredients = ingredients
    this.imageSource = imageSource
    this.instructions = instructions
    this.name = name
  }


}