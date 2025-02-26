import {apiClient} from "./client.tsx";
import {AiRecipeResponse} from "../dto/AiRecipeResponse.tsx";

export async function generateRecipe({ ingredients, accessToken }: { ingredients: string[], accessToken: string }) {
    const response = await apiClient.get<AiRecipeResponse>("/ai/recipe", {

        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        params: {
            "ingredients": ingredients.toString()
        }
    })

    const { recipe } = response.data

    return { recipe }
}