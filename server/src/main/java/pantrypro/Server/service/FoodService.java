package pantrypro.Server.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pantrypro.Server.dto.FoodCountResponse;
import pantrypro.Server.dto.FoodDeleteRequest;
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
    private final UserRepository userRepository;

    /**
     *
     * Gets all the food items from a user
     */
    public List<Food> getFoods(int offset, int limit) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(userEmail)
            .orElseThrow();
        Pageable pageable = PageRequest.of(offset, limit);

        return foodRepository.findFoodByOwner(user, pageable);



    }

    public List<Food> addFoods(List<FoodRequest> foodRequests) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow();
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

    @Transactional
    public void deleteFood(FoodDeleteRequest foodDeleteRequest) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(userEmail)
            .orElseThrow();
        foodRepository.deleteUsersWithIds(foodDeleteRequest.getFoodIds(), user);
    }

    public FoodCountResponse getFoodCount() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow();
        int foodCount = foodRepository.findNumberOfFood(user);

        return new FoodCountResponse(foodCount);
    }









}
