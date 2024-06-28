package pantrypro.Server.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import pantrypro.Server.dto.FoodRequest;
import pantrypro.Server.model.Food;
import pantrypro.Server.model.User;
import pantrypro.Server.repository.FoodRepository;
import pantrypro.Server.repository.UserRepository;
import pantrypro.Server.util.InvalidTokenException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository foodRepository;
    private final JwtService jwtService;

    /**
     *
     * Gets all the food items from a user
     */
    public Set<Food> getFoods(String authHeader) {
        User user = jwtService.getUserFromToken(authHeader);

        return foodRepository.findByOwner(user);



    }

    public List<Food> addFoods(List<FoodRequest> foodRequests, String authHeader) {
        User user = jwtService.getUserFromToken(authHeader);
        List<Food> foods = new ArrayList<>();
        for (FoodRequest foodRequest: foodRequests) {
            foods.add(
                Food
                .builder()
                    .name(foodRequest.getName())
                    .quantity(foodRequest.getQuantity())
                    .foodGroup(foodRequest.getGroup())
                    .owner(user)
                    .expiryDate(foodRequest.getExpiryDate())
                .build()
            );
        }
        foodRepository.saveAll(foods);

        return foods;
    }




}
