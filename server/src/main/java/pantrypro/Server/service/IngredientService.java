package pantrypro.Server.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pantrypro.Server.dto.Ingredient.IngredientJSON;
import pantrypro.Server.dto.Ingredient.SpoonacularIngredientResponse;
import pantrypro.Server.util.HTTPProperty;


import java.io.IOException;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IngredientService {
    @Value("${SPOONACULAR_API_KEY}")
    private String spoonacularAPIKey;

    private final HttpService httpService;

    public SpoonacularIngredientResponse findIngredients(String ingredient) throws IOException, URISyntaxException {

        /* Executing http request to spoonacular */
        String urlString = "https://api.spoonacular.com/food/ingredients/autocomplete?query=" + ingredient;
        ArrayList<HTTPProperty> httpProperties = new ArrayList<>();
        httpProperties.add(new HTTPProperty("x-api-key", spoonacularAPIKey));
        httpProperties.add(new HTTPProperty("Content-Type", "application/json"));
        String output = httpService.performRequest(urlString, httpProperties, "GET");

        ObjectMapper mapper = new ObjectMapper();
        List<IngredientJSON> ingredients = mapper.readValue(output,
            new TypeReference<ArrayList<IngredientJSON>>() {});


        return new SpoonacularIngredientResponse(ingredients);
    }

}
