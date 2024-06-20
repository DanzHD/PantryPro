package pantrypro.Server;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import pantrypro.Server.controller.AuthenticationController;
import pantrypro.Server.service.AuthenticationService;

@SpringBootTest
public class AuthenticationControllerTest {

    @Autowired
    AuthenticationController controller;
    @Autowired
    AuthenticationService authenticationService;

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


}
