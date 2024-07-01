package pantrypro.Server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pantrypro.Server.dto.FoodCountResponse;
import pantrypro.Server.dto.FoodDeleteRequest;
import pantrypro.Server.dto.FoodRequest;
import pantrypro.Server.model.Food;
import pantrypro.Server.service.FoodService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/api/v1/food")
@RequiredArgsConstructor
@CrossOrigin
public class FoodController {

    private final FoodService foodService;

    /**
     *
     * GET request for getting all the foods associated with a user
     */
    @GetMapping("/me")
    public ResponseEntity<Set<Food>> getFoods(@RequestParam int offset, @RequestParam int limit) {
        return ResponseEntity.ok(foodService.getFoods(offset, limit));
    }

    /**
     *
     * Adds a list of foods to the user
     */
    @PostMapping("/me")
    public ResponseEntity<List<Food>> addFoods(
        @RequestBody List<FoodRequest> foods
    ) {

        return ResponseEntity.ok(foodService.addFoods(foods));
    }

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

    @GetMapping("/count")
    public ResponseEntity<FoodCountResponse> getTotalFood() {

        return ResponseEntity.ok(foodService.getFoodCount());
    }









}
