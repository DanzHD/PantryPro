package pantrypro.Server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pantrypro.Server.dto.Ingredient.SpoonacularIngredientResponse;
import pantrypro.Server.service.IngredientService;

import java.io.IOException;
import java.net.*;


@RestController
@RequestMapping(value = "/api/v1/ingredients")
@RequiredArgsConstructor
@CrossOrigin
public class IngredientsController {


    private final IngredientService ingredientService;

    @GetMapping("/spoonacular")
    public ResponseEntity<SpoonacularIngredientResponse> completeIngredients(@RequestParam String ingredient) throws IOException, URISyntaxException {
        try {

            return ResponseEntity.ok(ingredientService.findIngredients(ingredient));
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
