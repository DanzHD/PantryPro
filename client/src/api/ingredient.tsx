import {apiClient} from "./client.tsx";
import {IngredientResponse} from "../dto/IngredientResponse.ts";

export async function getIngredientList({ ingredient, token }: { ingredient: string, token: string }) {

    const res = await apiClient.get<IngredientResponse>(`/ingredients/spoonacular?ingredient=${ingredient}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const { ingredients } = res.data

    return { ingredients }



}