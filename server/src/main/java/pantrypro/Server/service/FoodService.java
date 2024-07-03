package pantrypro.Server.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pantrypro.Server.Enums.FoodGroup;
import pantrypro.Server.dto.FoodCountResponse;
import pantrypro.Server.dto.FoodDeleteRequest;
import pantrypro.Server.dto.FoodRequest;
import pantrypro.Server.dto.FoodResponse;
import pantrypro.Server.model.Food;
import pantrypro.Server.model.User;
import pantrypro.Server.repository.FoodRepository;
import pantrypro.Server.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository foodRepository;
    private final UserRepository userRepository;

    /**
     *
     * Gets all the food items from a user
     */
    public FoodResponse getFoods(int page, int limit) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(userEmail)
            .orElseThrow();
        Pageable pageable = PageRequest.of(page, limit);

        List<Food> foods = foodRepository.findFoodByOwner(user, pageable);
        int count = foodRepository.findNumberOfFood(user);

        return FoodResponse
            .builder()
            .foods(foods)
            .count(count)
            .build();

    }

    public FoodResponse getFoods(int page, int limit, FoodGroup foodGroup) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(userEmail)
            .orElseThrow();
        Pageable pageable = PageRequest.of(page, limit);

        List<Food> foods = foodRepository.findFoodByOwnerAndFoodGroup(user, foodGroup, pageable);
        int count = foodRepository.countFoodsByOwnerAndFoodGroup(user, foodGroup);
        return FoodResponse
            .builder()
            .foods(foods)
            .count(count)
            .build();
    }

    public FoodResponse getFoods(int page, int limit, FoodGroup foodGroup, String foodSearchQuery) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(userEmail)
            .orElseThrow();
        Pageable pageable = PageRequest.of(page, limit);

        List<Food> foods = foodRepository.findFoodByOwnerAndFoodGroupAndNameContaining(user, foodGroup, foodSearchQuery, pageable);
        int count = foodRepository.countFoodsByOwnerAndFoodGroupAndNameContaining(user, foodGroup, foodSearchQuery);

        return FoodResponse
            .builder()
            .foods(foods)
            .count(count)
            .build();

    }

    public FoodResponse getFoods(int page, int limit, String foodSearchQuery) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(userEmail)
            .orElseThrow();
        Pageable pageable = PageRequest.of(page, limit);

        List<Food> foods = foodRepository.findFoodByOwnerAndNameContaining(user, foodSearchQuery, pageable);
        int count = foodRepository.countFoodsByOwnerAndNameContaining(user, foodSearchQuery);

        return FoodResponse
            .builder()
            .foods(foods)
            .count(count)
            .build();

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
