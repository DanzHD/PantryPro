export class DeleteScheduledMealDto {
  date: string
  recipeId: number

  constructor(date: string, recipeId: number) {
    this.date = date
    this.recipeId = recipeId
  }
}