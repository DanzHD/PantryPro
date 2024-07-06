package pantrypro.Server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pantrypro.Server.Enums.FoodGroup;
import pantrypro.Server.dto.FoodCountResponse;
import pantrypro.Server.dto.FoodDeleteRequest;
import pantrypro.Server.dto.FoodRequest;
import pantrypro.Server.dto.FoodResponse;
import pantrypro.Server.model.Food;
import pantrypro.Server.service.FoodService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/v1/food")
@RequiredArgsConstructor
@CrossOrigin
public class FoodController {

    private final FoodService foodService;

    /**
     * GET request for getting all the foods associated with a user
     */
    @GetMapping("/me")
    public ResponseEntity<FoodResponse> getFoods(
        @RequestParam int page,
        @RequestParam int limit,
        @RequestParam Optional<FoodGroup> foodGroup,
        @RequestParam Optional<String> foodName
    ) {

        if (foodGroup.isPresent() && foodName.isEmpty()) {
            return ResponseEntity.ok(foodService.getFoods(page, limit, foodGroup.get()));
        }
        if (foodGroup.isPresent()) {
            return ResponseEntity.ok(foodService.getFoods(page, limit, foodGroup.get(), foodName.get()));
        }
        if (foodName.isPresent()) {
            return ResponseEntity.ok(foodService.getFoods(page, limit, foodName.get()));
        }

        return ResponseEntity.ok(foodService.getFoods(page, limit));
    }

    /**
     * Adds a list of foods to the user
     */
    @PostMapping("/me")
    public ResponseEntity<List<Food>> addFoods(
        @RequestBody List<FoodRequest> foods
    ) {

        return ResponseEntity.ok(foodService.addFoods(foods));
    }

    /**
     * HTTP request for deleting a food from a user's account
     */
    @DeleteMapping("/me")
    public ResponseEntity<HttpStatus> deleteFoods(@RequestBody FoodDeleteRequest foodIds) {
        try {
            foodService.deleteFood(foodIds);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception exception) {
            System.out.println(exception.getMessage());

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }




}