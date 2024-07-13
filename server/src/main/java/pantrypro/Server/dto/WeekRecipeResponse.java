package pantrypro.Server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WeekRecipeResponse {

    private List<RecipeDto> mondayRecipes;
    private List<RecipeDto> tuesdayRecipes;

    private List<RecipeDto> wednesdayRecipes;

    private List<RecipeDto> thursdayRecipes;

    private List<RecipeDto> fridayRecipes;

    private List<RecipeDto> saturdayRecipes;

    private List<RecipeDto> sundayRecipes;


}
