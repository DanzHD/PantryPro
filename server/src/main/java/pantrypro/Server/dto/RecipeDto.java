package pantrypro.Server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pantrypro.Server.model.Ingredient;
import pantrypro.Server.model.Recipe;

import java.util.List;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecipeDto {

    private Long recipeId;
    private List<IngredientDto> ingredients;
    private String instructions;
    private String imageSource;

}
