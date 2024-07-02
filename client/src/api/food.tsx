import {apiClient} from "./client.tsx";
import {Food} from "../dto/FoodResponse.tsx";
import {FoodCountResponse} from "../dto/FoodCountResponse.tsx";

export async function getUserFood({ limit, pageNumber, token }: {limit: number, pageNumber: number, token: string | null}) {
  if (!token) {
    return
  }

  const response = await apiClient.get<Food[]>(`/food/me?limit=${limit}&offset=${pageNumber}`,
    {headers: { Authorization: `Bearer ${token}`}}
  )

  return response.data
}

export async function getUserFoodCount({ token}: {token: string | null}) {
  if (!token) {
    return
  }

  const response = await apiClient.get<FoodCountResponse>(`/food/count`, {
    headers: { Authorization: `Bearer ${token}`}
  })
  const {foodCount} = response.data

  return foodCount

}

