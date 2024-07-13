package pantrypro.Server.service;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pantrypro.Server.dto.AddRecipeDto;
import pantrypro.Server.dto.IngredientDto;
import pantrypro.Server.dto.RecipeDto;
import pantrypro.Server.model.Ingredient;
import pantrypro.Server.model.MealSchedule;
import pantrypro.Server.model.Recipe;
import pantrypro.Server.model.User;
import pantrypro.Server.repository.IngredientRepository;
import pantrypro.Server.repository.MealScheduleRepository;
import pantrypro.Server.repository.RecipeRepository;
import pantrypro.Server.repository.UserRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MealPlanningService {

    private final MealScheduleRepository mealScheduleRepository;
    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;
    private final UserRepository userRepository;

    /**
     *
     * Adds all the recipes within the addRecipeDto for the date specified within the dto for the user
     */
    public void addRecipes(AddRecipeDto addRecipeDto) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(userEmail)
            .orElseThrow();
        List<Recipe> newRecipesForUser = new ArrayList<>();
        List<Ingredient> ingredientsForRecipe;
        Recipe newRecipe;
        for (RecipeDto recipe: addRecipeDto.getRecipes()) {

            parseAndSaveNewIngredients(recipe.getIngredients());
            ingredientsForRecipe = parseIngredientDto(recipe.getIngredients());
            newRecipe = Recipe
                .builder()
                .id(recipe.getRecipeId())
                .imageSource(recipe.getImageSource())
                .instructions(recipe.getInstructions())
                .ingredients(ingredientsForRecipe)
                .build();

            newRecipesForUser.add(addRecipeIfNonExistent(newRecipe));

        }

        Optional<MealSchedule> mealSchedule = mealScheduleRepository.findMealScheduleByDateAndUser(addRecipeDto.getDate(), user);
        if (mealSchedule.isPresent()) {

            mealSchedule.get().getRecipes().addAll(newRecipesForUser);
            mealSchedule.get().setRecipes(removeDuplicates(mealSchedule.get().getRecipes()));
            mealScheduleRepository.save(mealSchedule.get());
        } else {

            mealScheduleRepository.save(
                MealSchedule
                    .builder()
                    .date(addRecipeDto.getDate())
                    .recipes(newRecipesForUser)
                    .user(user)
                    .build()
            );
        }


    }

    /**
     *
     * Filters out any duplicate ids within recipes
     */
    public List<Recipe> removeDuplicates(List<Recipe> recipes) {
        HashSet<Long> recipeIds = new HashSet<>();
        List<Recipe> filteredRecipes = new ArrayList<>();
        for (Recipe recipe: recipes) {
            if (recipeIds.contains(recipe.getId())) {
                continue;
            }
            recipeIds.add(recipe.getId());
            filteredRecipes.add(recipe);
        }

        return filteredRecipes;
    }

    /**
     *
     * Saves all new ingredients which are not currently stored within the database
     */
    public void parseAndSaveNewIngredients(List<IngredientDto> ingredientDto) {
        for (IngredientDto ingredientDto1: ingredientDto) {
            if (ingredientRepository.existsByName(ingredientDto1.getName())) {
                continue;
            }
            ingredientRepository.save(
                Ingredient
                .builder()
                .name(ingredientDto1.getName())
                .build());


        }

    }

    /**
     *
     * From the ingredients dto, finds the associated ingredients within the database and returns the list of
     * ingredients
     *
     */
    public List<Ingredient> parseIngredientDto(List<IngredientDto> ingredientDtos) {

        Optional<Ingredient> ingredient;
        List<Ingredient> ingredients = new ArrayList<>();

        for (IngredientDto ingredientDto: ingredientDtos) {
            ingredient = ingredientRepository.findIngredientByName(ingredientDto.getName());
            if (ingredient.isPresent()) {

                ingredients.add(ingredient.get());
            }
        }

        return ingredients;
    }

    /**
     *
     * Saves the recipe into the database if it does not currently exist
     * returns the newly saved recipe if recipe didn't exist or returns the recipe already in the database
     */
    public Recipe addRecipeIfNonExistent(Recipe recipe) {
        if (!recipeRepository.existsById(recipe.getId())) {
            recipeRepository.save(recipe);
            return recipe;
        }

        return recipeRepository.findById(recipe.getId())
            .orElseThrow();


    }

}
