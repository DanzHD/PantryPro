package pantrypro.Server.dto.Ingredient;

import com.fasterxml.jackson.annotation.JsonProperty;

public class IngredientJSON {
    @JsonProperty("name")
    private String name;

    @JsonProperty("image")
    public String image;
}
