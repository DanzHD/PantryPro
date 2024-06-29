package pantrypro.Server;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.hibernate.annotations.processing.SQL;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Testcontainers;
import pantrypro.Server.Enums.FoodGroup;
import pantrypro.Server.controller.FoodController;
import pantrypro.Server.dto.AuthenticationResponse;
import pantrypro.Server.dto.FoodDeleteRequest;
import pantrypro.Server.dto.FoodRequest;
import pantrypro.Server.dto.RegisterRequest;
import pantrypro.Server.model.Food;
import pantrypro.Server.model.User;
import pantrypro.Server.repository.FoodRepository;
import pantrypro.Server.repository.UserRepository;
import pantrypro.Server.service.AuthenticationService;
import pantrypro.Server.service.FoodService;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
@AutoConfigureWebTestClient
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class FoodTests {

    @Autowired
    FoodController foodController;
    @Autowired
    FoodService foodService;
    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    FoodRepository foodRepository;
    @Autowired
    UserRepository userRepository;

    static MySQLContainer mySQLContainer;
    static {
        mySQLContainer = new MySQLContainer("mysql:latest");
        mySQLContainer.start();
    }

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", mySQLContainer::getJdbcUrl);
        registry.add("spring.datasource.username", mySQLContainer::getUsername);
        registry.add("spring.datasource.password", mySQLContainer::getPassword);
        registry.add("spring.jpa.hibernate.ddl-auto", () ->"create");

    }

    MockMvc mockMvc;
    private String accessToken;

    @BeforeEach
    void setup() {

        this.mockMvc = MockMvcBuilders.standaloneSetup(foodController).build();
        String username = "test@gmail.com";
        String password = "adwadaw1dwa@!Db";
        RegisterRequest registerRequest = RegisterRequest.builder()
            .email(username)
            .password(password)
            .build();
        AuthenticationResponse authenticationResponse = authenticationService.register(registerRequest);
        accessToken = authenticationResponse.getAccessToken();

        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
        SecurityContextHolder.getContext().setAuthentication(authRequest);

        populateFood();

    }


    void populateFood() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, 2024);
        calendar.set(Calendar.MONTH, Calendar.JULY);
        calendar.set(Calendar.DAY_OF_MONTH, 25);

        User user = userRepository.findByEmail("test@gmail.com").orElseThrow();

        Food food = Food
            .builder()
            .foodGroup(FoodGroup.MEAT)
            .name("Chicken")
            .expiryDate(new Date(calendar.getTimeInMillis()))
            .owner(user)
            .build();
        foodRepository.save(food);
        System.out.println(foodRepository.findAll());
    }

    @Test
    void Add_food_for_user() throws Exception {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, 2024);
        calendar.set(Calendar.MONTH, Calendar.JULY);
        calendar.set(Calendar.DAY_OF_MONTH, 25);

        List<FoodRequest> foodRequests = new ArrayList<>();
        FoodRequest beef = new FoodRequest(new Date(calendar.getTimeInMillis()), FoodGroup.MEAT, "Beef", 500);
        foodRequests.add(beef);

        RequestBuilder request = MockMvcRequestBuilders.post("/api/v1/food/me")
            .with(user("test@gmail.com"))
            .content(objectMapper.writeValueAsString(foodRequests))
            .contentType(MediaType.APPLICATION_JSON)
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
            .accept(MediaType.APPLICATION_JSON);

        mockMvc.perform(request)
            .andExpectAll(
                status().isOk()

            );
       assert(foodRepository.findById(2L).isPresent());

    }

    @Test
    void Delete_food_for_user() {
        List<Long> foodsIds = new ArrayList<Long>();
        foodsIds.add(1L);

        FoodDeleteRequest foodDeleteRequest = FoodDeleteRequest
            .builder()
            .foodIds(foodsIds)
            .build();
        foodService.deleteFood(foodDeleteRequest);

        Assertions.assertTrue(foodRepository.findById(1L).isEmpty());
    }
    
    @Test
    void Disallowed_deletion_from_another_user() {
        String username = "test2@gmail.com";
        String password = "adwadaw1dwa@!Db";
        RegisterRequest registerRequest = RegisterRequest.builder()
            .email(username)
            .password(password)
            .build();
        AuthenticationResponse authenticationResponse = authenticationService.register(registerRequest);
        accessToken = authenticationResponse.getAccessToken();

        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);

        SecurityContextHolder.getContext().setAuthentication(authRequest);

        List<Long> foodsIds = new ArrayList<Long>();
        foodsIds.add(1L);
        System.out.println(foodsIds);

        FoodDeleteRequest foodDeleteRequest = FoodDeleteRequest
            .builder()
            .foodIds(foodsIds)
            .build();
        foodService.deleteFood(foodDeleteRequest);

        Assertions.assertFalse(foodRepository.findById(1L).isEmpty());


    }






}
