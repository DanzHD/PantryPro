package pantrypro.Server.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pantrypro.Server.dto.Ingredient.IngredientJSON;
import pantrypro.Server.dto.Ingredient.SpoonacularIngredientResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
public class IngredientService {
    @Value("${SPOONACULAR_API_KEY}")
    private String spoonacularAPIKey;
    public SpoonacularIngredientResponse findIngredients(String ingredient) throws IOException, URISyntaxException {

        /* Executing http request to spoonacular */
        String urlString = "https://api.spoonacular.com/food/ingredients/autocomplete?query=" + ingredient;
        URL url = new URI(urlString).toURL();
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("x-api-key", spoonacularAPIKey);
        con.setConnectTimeout(5000);
        con.setReadTimeout(5000);
        con.connect();

        /* Parsing spoonacular response */
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader((con.getInputStream())));
        StringBuilder sb = new StringBuilder();
        String output;

        while ((output = bufferedReader.readLine()) != null) {
            sb.append(output);
        }

        ObjectMapper mapper = new ObjectMapper();
        List<IngredientJSON> ingredients = mapper.readValue(sb.toString(),
            new TypeReference<ArrayList<IngredientJSON>>() {});


        return new SpoonacularIngredientResponse(ingredients);
    }

}
