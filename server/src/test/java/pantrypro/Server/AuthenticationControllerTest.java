package pantrypro.Server;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import pantrypro.Server.Enums.Role;
import pantrypro.Server.controller.AuthenticationController;
import pantrypro.Server.dto.RegisterRequest;
import pantrypro.Server.model.User;
import pantrypro.Server.service.AuthenticationService;
import pantrypro.Server.service.JwtService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
public class AuthenticationControllerTest {

    @Autowired
    AuthenticationController controller;
    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    JwtService jwtService;

    MockMvc mockMvc;

    @BeforeEach
    void setup() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
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
        String password = "1!bCDdawdwankjn@#@#!#nnjdwakjnknkWNdkJWJD@#@";
        Assertions.assertFalse(authenticationService.passwordIsValid(password));
    }

    @Test
    void passwordIsValid_False_ContainsWhiteSpace() {
        String password = "1@eR fdwadwa";
        Assertions.assertFalse(authenticationService.passwordIsValid(password));
    }

    @Test
    void register_Ok_ValidUserRegistration() throws Exception {
        RegisterRequest request = new RegisterRequest("test@gmail.com", "Abc@20dwax");

        mockMvc.perform(post("/api/v1/auth/register").accept(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request))
            .contentType(MediaType.APPLICATION_JSON))
            .andExpectAll(
                status().isOk(),
                content().contentType("application/json;"));

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
