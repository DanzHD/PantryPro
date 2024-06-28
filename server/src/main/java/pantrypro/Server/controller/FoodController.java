package pantrypro.Server.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pantrypro.Server.dto.FoodRequest;
import pantrypro.Server.model.Food;
import pantrypro.Server.service.FoodService;

import java.util.ArrayList;
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
    public ResponseEntity<Set<Food>> getFoods(HttpServletRequest request) {
        return ResponseEntity.ok(foodService.getFoods(request.getHeader(HttpHeaders.AUTHORIZATION)));
    }

    @PostMapping("/me")
    public ResponseEntity<List<Food>> addFoods(
        HttpServletRequest request,
        @RequestBody List<FoodRequest> foods
    ) {

        return ResponseEntity.ok(foodService.addFoods(foods, request.getHeader(HttpHeaders.AUTHORIZATION)));
    }







}
