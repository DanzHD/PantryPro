import FoodGroups from "../enum/foodGroups.tsx";

interface FoodResponse {
  data: Food[]
}

export interface Food {
  id: number,
  name: string,
  expiryDate: string,
  foodGroup: FoodGroups,
  quantity: number
}

export default FoodResponse