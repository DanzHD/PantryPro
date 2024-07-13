package pantrypro.Server.service;


import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pantrypro.Server.dto.*;
import pantrypro.Server.model.Ingredient;
import pantrypro.Server.model.MealSchedule;
import pantrypro.Server.model.Recipe;
import pantrypro.Server.model.User;
import pantrypro.Server.repository.IngredientRepository;
import pantrypro.Server.repository.MealScheduleRepository;
import pantrypro.Server.repository.RecipeRepository;
import pantrypro.Server.repository.UserRepository;

import java.util.*;

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

    /**
     *
     * Removes a scheduled meal from a date based on removeScheduledMealDto
     */
    @Transactional
    public void removeScheduledMeal(RemoveScheduledMealDto removeScheduledMealDto) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(userEmail)
            .orElseThrow();
        MealSchedule schedule = mealScheduleRepository.findMealScheduleByDateAndUser(removeScheduledMealDto.getDate(), user)
            .orElseThrow();
        List<Recipe> scheduledRecipes = schedule.getRecipes();
        scheduledRecipes.removeIf(recipe -> recipe.getId() == removeScheduledMealDto.getRecipeId());
        mealScheduleRepository.save(schedule);
    }

    public WeekRecipeResponse getWeekOfScheduledMeals(int week, int year) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(userEmail)
            .orElseThrow();
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        calendar.set(Calendar.WEEK_OF_YEAR, week);
        calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        calendar.set(Calendar.HOUR_OF_DAY, Calendar.AM);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        Date fromDate = calendar.getTime();
        System.out.println(fromDate);
        calendar.add(Calendar.DAY_OF_MONTH, 7);
        Date toDate = calendar.getTime();
        System.out.println(toDate);
        List<MealSchedule> mealSchedules = mealScheduleRepository.findMealScheduleByDateBetweenAndUser(fromDate, toDate, user);

        WeekRecipeResponse.WeekRecipeResponseBuilder weekRecipeResponseBuilder = WeekRecipeResponse.builder();

        for (MealSchedule mealSchedule: mealSchedules) {
            calendar.setTime(mealSchedule.getDate());
            int day = calendar.get(Calendar.DAY_OF_WEEK);
            switch (day) {
                case Calendar.MONDAY:
                    weekRecipeResponseBuilder.mondayRecipes(parseListOfRecipeToRecipeDto(mealSchedule.getRecipes()));
                case Calendar.TUESDAY:
                    weekRecipeResponseBuilder.tuesdayRecipes(parseListOfRecipeToRecipeDto(mealSchedule.getRecipes()));
                case Calendar.WEDNESDAY:
                    weekRecipeResponseBuilder.wednesdayRecipes(parseListOfRecipeToRecipeDto(mealSchedule.getRecipes()));
                case Calendar.THURSDAY:
                    weekRecipeResponseBuilder.thursdayRecipes(parseListOfRecipeToRecipeDto(mealSchedule.getRecipes()));
                case Calendar.FRIDAY:
                    weekRecipeResponseBuilder.fridayRecipes(parseListOfRecipeToRecipeDto(mealSchedule.getRecipes()));
                case Calendar.SATURDAY:
                    weekRecipeResponseBuilder.saturdayRecipes(parseListOfRecipeToRecipeDto(mealSchedule.getRecipes()));
                case Calendar.SUNDAY:
                    weekRecipeResponseBuilder.sundayRecipes(parseListOfRecipeToRecipeDto(mealSchedule.getRecipes()));

            }
        }

        return weekRecipeResponseBuilder.build();

    }

    /* Converts a list of recipe to list of recipeDto */
    public List<RecipeDto> parseListOfRecipeToRecipeDto(List<Recipe> recipes) {
        List<RecipeDto> recipeDtos = new ArrayList<>();
        for (Recipe recipe: recipes) {
            recipeDtos.add(
                new RecipeDto(recipe.getId(),
                    parseListOfIngredientToIngredientDto(recipe.getIngredients()),
                    recipe.getInstructions(),
                    recipe.getImageSource()
                )
            );
        }
        return recipeDtos;
    }

    /**
     *
     * Parses a list of ingredients into an ingredientDto
     */
    public List<IngredientDto> parseListOfIngredientToIngredientDto(List<Ingredient> ingredients) {
        List<IngredientDto> ingredientDtos = new ArrayList<>();
        for (Ingredient ingredient: ingredients) {
            ingredientDtos.add(new IngredientDto(ingredient.getName()));
        }

        return ingredientDtos;
    }


}
