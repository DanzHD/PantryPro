import {mealClient} from "./client.tsx";
import {MealsResponse} from "../dto/MealResponse.tsx";



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

