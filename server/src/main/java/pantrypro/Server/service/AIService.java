package pantrypro.Server.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pantrypro.Server.dto.Ingredient.IngredientDto;
import pantrypro.Server.dto.Ingredient.IngredientJSON;
import pantrypro.Server.dto.Ingredient.SpoonacularIngredientResponse;
import pantrypro.Server.dto.Recipe.AiRecipeResponse;
import pantrypro.Server.util.HTTPProperty;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AIService {

    @Value("${GEMINI_API_KEY}")
    private String API_KEY;

    private final HttpService httpService;

    public AiRecipeResponse generateRecipe(IngredientDto[] ingredients) throws IOException, URISyntaxException {
        String urlString = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY;
        ArrayList<HTTPProperty> properties = new ArrayList<>();
        properties.add(new HTTPProperty("Content-Type", "application/json"));

        StringBuilder ingredientsString = new StringBuilder();
        for (IngredientDto ingredient: ingredients) {
            ingredientsString.append(ingredient.getName()).append("\n");
        }

        JSONObject requestBody = new JSONObject();

        JSONArray parts = new JSONArray()
            .put(
                new JSONObject()
                    .put("text",
                        "Generate 1 recipe with the following ingredients:"
                        + ingredientsString.toString()
                        + ". If the ingredient list is empty or insufficient, add other ingredients."
                        + "Return with the following format: "
                        + "recipe: recipe name followed by empty line followed by ingredient header"
                        + "followed by ingredient list, followed with another empty line then numbered instructions"
                        + "separate each instruction with an empty line"
                    )
            );

        requestBody.put("contents",
            new JSONObject()
                .put("parts", parts)
        );



        String response = httpService.performRequest(urlString, properties, "POST", true, requestBody);
        JSONObject responseJSON = new JSONObject(response);
        JSONObject candidates = (JSONObject) responseJSON
            .getJSONArray("candidates")
            .get(0);
        JSONObject part = (JSONObject) candidates.getJSONObject("content")
            .getJSONArray("parts")
            .get(0);
        String recipe = (String) part.get("text");

        return AiRecipeResponse
            .builder()
            .recipe(recipe)
            .build();



        
    }
}

