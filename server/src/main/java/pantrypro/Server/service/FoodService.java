package pantrypro.Server.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import pantrypro.Server.model.Food;
import pantrypro.Server.model.User;
import pantrypro.Server.repository.FoodRepository;
import pantrypro.Server.repository.UserRepository;
import pantrypro.Server.util.InvalidTokenException;

import java.util.ArrayList;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository foodRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    /**
     *
     * Gets all the food items from a user
     */
    public Set<Food> getFoods(HttpServletRequest request) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        String accessToken = authHeader.substring(7);
        String userEmail = jwtService.extractUsername(accessToken);

        if (userEmail != null) {
            User user = userRepository.findByEmail(userEmail)
                .orElseThrow();

            Set<Food> foods = foodRepository.findByOwner(user);

            return foods;
        }

        throw new InvalidTokenException();

    }


}
