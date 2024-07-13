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

    private List<RecipeDto> mondayRecipes = new ArrayList<>();
    private List<RecipeDto> tuesdayRecipes = new ArrayList<>();

    private List<RecipeDto> wednesdayRecipes = new ArrayList<>();

    private List<RecipeDto> thursdayRecipes = new ArrayList<>();

    private List<RecipeDto> fridayRecipes = new ArrayList<>();

    private List<RecipeDto> saturdayRecipes = new ArrayList<>();

    private List<RecipeDto> sundayRecipes = new ArrayList<>();


}
