export class RecipeDto {
  recipeId: number
  ingredients: string[]
  instructions: string | null
  imageSource: string | null

  constructor(recipeId: number, ingredients: string[], instructions: string | null, imageSource: string | null) {
    this.recipeId = recipeId
    this.ingredients = ingredients
    this.imageSource = imageSource
    this.instructions = instructions
  }


}