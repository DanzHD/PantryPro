import {apiClient} from "./client.tsx";
import FoodResponse from "../dto/FoodResponse.tsx";
import FoodGroups from "../enum/foodGroups.tsx";
import {FoodRequestDto} from "../dto/FoodRequestDto.tsx";

export async function getUserFood({ limit, pageNumber, foodGroup, token, foodName }:
  {limit: number, pageNumber: number, token?: string | null, foodGroup?: FoodGroups, foodName?: string | null}) {
  if (!token) {
    throw new Error("Invalid Token")
  }
  const searchParams = new URLSearchParams()
  searchParams.append("limit", limit.toString())
  searchParams.append("page", pageNumber.toString())

  if (foodGroup) {

    searchParams.append("foodGroup", foodGroup.toUpperCase())
  }
  if (foodName) {
    searchParams.append("foodName", foodName)
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

export async function addFoodForUser({ foods, token }: { foods: FoodRequestDto[], token: string | null }) {
  if (!token) {
    throw new Error("Invalid Token")

  }

  console.log(foods)
  await apiClient.post(`/food/me`, foods, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

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



