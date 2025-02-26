package pantrypro.Server.dto.Recipe;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pantrypro.Server.dto.Ingredient.IngredientDto;

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
    private String name;

}
