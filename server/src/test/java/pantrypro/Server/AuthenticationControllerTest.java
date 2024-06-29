package pantrypro.Server;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import pantrypro.Server.Enums.Role;
import pantrypro.Server.controller.AuthenticationController;
import pantrypro.Server.dto.RegisterRequest;
import pantrypro.Server.model.User;
import pantrypro.Server.service.AuthenticationService;
import pantrypro.Server.service.JwtService;

import static org.skyscreamer.jsonassert.JSONAssert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
@AutoConfigureWebTestClient
public class AuthenticationControllerTest {

    @Autowired
    AuthenticationController controller;
    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    JwtService jwtService;

    static final MySQLContainer mySQLContainer;
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

    @BeforeEach
    void setup() {

        this.mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @AfterAll
    static void cleanUp() {
        mySQLContainer.stop();
    }

    @Test
    void passwordIsValid_True_ValidPassword() {
        String password = "Abc@20dwax";
        Assertions.assertTrue(authenticationService.passwordIsValid(password));

    }

    @Test
    void passwordIsValid_False_NoLowerCase() {
        String password = "AWDAWD!123";
        Assertions.assertFalse(authenticationService.passwordIsValid(password));
    }

    @Test
    void passwordIsValid_False_NoUpperCase() {
        String password = "12345678abcdef!@#";
        Assertions.assertFalse(authenticationService.passwordIsValid(password));
    }

    @Test
    void passwordIsValid_False_NoSpecialCharacter() {
        String password = "12345678abcdefA";
        Assertions.assertFalse(authenticationService.passwordIsValid(password));
    }

    @Test
    void passwordIsValid_False_TooShort() {
        String password = "1!bCD";
        Assertions.assertFalse(authenticationService.passwordIsValid(password));
    }

    @Test
    void passwordIsValid_False_TooLong() {
        String password = "1!bCDdawdwankjn@#@#!#nnjdwakjnknkWNdkJWJD@#@dwaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        Assertions.assertFalse(authenticationService.passwordIsValid(password));
    }

    @Test
    void passwordIsValid_False_ContainsWhiteSpace() {
        String password = "1@eR fdwadwa";
        Assertions.assertFalse(authenticationService.passwordIsValid(password));
    }

    @Test
    void register_Ok_ValidUserRegistration() throws Exception {
        RegisterRequest registerRequest = new RegisterRequest("test@gmail.com", "Abc@20dwax");

        RequestBuilder request = MockMvcRequestBuilders.post("/api/v1/auth/register")
            .content(objectMapper.writeValueAsString(registerRequest))
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON);
        mockMvc.perform(request)
            .andExpect(status().isOk())
            .andExpect(MockMvcResultMatchers.jsonPath("$.access_token").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.refresh_token").exists());




    }

    @Test
    void generateToken_Ok_SuccessfulTokenGeneration() {
        User user = User.builder()
            .email("Testuser@gmail.com")
            .password("adwadaw1dwa@!Db")
            .role(Role.USER)
            .build();

        String accessToken = jwtService.generateAccessToken(user);

        Assertions.assertNotNull(accessToken);
    }




}
