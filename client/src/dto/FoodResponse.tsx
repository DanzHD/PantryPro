import FoodGroups from "../enum/foodGroups.tsx";

interface FoodResponse {
  foods: Food[],
  count: number
}

export interface Food {
  id: number,
  name: string,
  expiryDate: string,
  foodGroup: FoodGroups
}

export default FoodResponse