import {apiClient, mealClient} from "./client.tsx";
import {MealsResponse} from "../dto/MealResponse.tsx";
import {ScheduleMealsDto} from "../dto/ScheduleMealsDto.tsx";
import APIError from "../util/APIError.tsx";
import {DeleteScheduledMealDto} from "../dto/DeleteScheduledMealDto.tsx";



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
