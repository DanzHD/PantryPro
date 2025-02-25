package pantrypro.Server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pantrypro.Server.dto.Ingredient.IngredientDto;
import pantrypro.Server.dto.Recipe.AiRecipeResponse;
import pantrypro.Server.service.AIService;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Arrays;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
@CrossOrigin
public class AiController {
    private final AIService aiService;

    @GetMapping("/recipe")
    public ResponseEntity<AiRecipeResponse> generateRecipe(@RequestParam IngredientDto[] ingredients) throws IOException, URISyntaxException {
        System.out.println(Arrays.toString(ingredients));
        return ResponseEntity.ok(aiService.generateRecipe(ingredients));
    }
}
