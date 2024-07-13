package pantrypro.Server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pantrypro.Server.dto.AddRecipeDto;
import pantrypro.Server.dto.RemoveScheduledMealDto;
import pantrypro.Server.dto.WeekRecipeResponse;
import pantrypro.Server.service.MealPlanningService;


import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/meal")
@RequiredArgsConstructor
@CrossOrigin
public class MealPlanningController {

    private final MealPlanningService mealPlanningService;

    /**
     *
     * Adds a recipe to a specific date for a user
     */
    @PostMapping("")
    public ResponseEntity<HttpStatus> addRecipe(@RequestBody AddRecipeDto addRecipeDto) {
        try {
            mealPlanningService.addRecipes(addRecipeDto);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (NoSuchElementException exception) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/week")
    public ResponseEntity<WeekRecipeResponse> getScheduledRecipes(@RequestParam int week, @RequestParam int year) {
        // Todo write up code to get a week of meals

        return  ResponseEntity.ok(mealPlanningService.getWeekOfScheduledMeals(week, year));
    }

    /**
     *
     * Removes a scheduled meal for a user
     *
     */
    @DeleteMapping("/me")
    public ResponseEntity<HttpStatus> removeMeal(@RequestBody RemoveScheduledMealDto removeScheduledMealDto) {
        try {
            mealPlanningService.removeScheduledMeal(removeScheduledMealDto);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }





}
