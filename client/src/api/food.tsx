import {apiClient} from "./client.tsx";
import FoodResponse from "../dto/FoodResponse.tsx";
import FoodGroups from "../enum/foodGroups.tsx";

export async function getUserFood({ limit, pageNumber, foodGroup, token }:
  {limit: number, pageNumber: number, token?: string | null, foodGroup?: FoodGroups}) {
  if (!token) {
    throw new Error("Invalid Token")
  }
  const searchParams = new URLSearchParams()
  searchParams.append("limit", limit.toString())
  searchParams.append("page", pageNumber.toString())

  if (foodGroup) {

    searchParams.append("foodGroup", foodGroup.toUpperCase())
  }


  const response = await apiClient.get<FoodResponse>(`/food/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: searchParams
    }
  )

  const {foods, count } = response.data

  return {foods: foods, count: count}
}

export async function deleteFood({ token, foodIds }: { token?: string | null, foodIds: number[] | null}) {
  if (!token) {
    throw new Error("Invalid Token")
  }

  await apiClient.delete(`/food/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      foodIds: foodIds
    }
  })

}



