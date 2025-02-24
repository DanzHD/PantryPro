package pantrypro.Server.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pantrypro.Server.dto.Auth.*;
import pantrypro.Server.service.AuthenticationService;
import pantrypro.Server.util.AccountEnabledException;
import pantrypro.Server.util.InvalidTokenException;
import pantrypro.Server.util.PasswordTooWeakException;
import pantrypro.Server.util.UserAlreadyExistsException;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService service;


    /**
     *
     * Registers a new user account, taking in the user's email and password
     * if registration is successful, sends back access token
     */
    @PostMapping("/register")
    public ResponseEntity<HttpStatus> register(
            @RequestBody RegisterRequest request
    ) {
        try {
            return ResponseEntity.ok(service.register(request));
        } catch (UserAlreadyExistsException exception) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);

        } catch (PasswordTooWeakException exception) {
            return new ResponseEntity<>(HttpStatus.UNPROCESSABLE_ENTITY);
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/resend-validation-email")
    public ResponseEntity<HttpStatus> resendConfirmationEmail(
        @RequestBody ConfirmationEmailRequest request
    ) {
        try {
            System.out.println("request sent");
            return ResponseEntity.ok(service.resendConfirmationEmail(request));
        } catch (Exception exception) {
            System.out.println(exception.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     *
     * Validates the user's verification token and enables the user
     */
    @PostMapping("/register_complete")
    public ResponseEntity<AuthenticationResponse> enableUser(@RequestBody EnableAccountDto enableAccountDto) {
        try {

            return ResponseEntity.ok(service.enableUser(enableAccountDto.getVerificationToken()));
        } catch (AccountEnabledException exception) {
            return new ResponseEntity<AuthenticationResponse>(HttpStatus.CONFLICT);
        } catch (InvalidTokenException exception) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * Authenticates the user using the email and password
     * If successful, sends back the access token
     */
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {

            return ResponseEntity.ok(service.refreshToken(request, response));
        } catch (InvalidTokenException exception) {
            return new ResponseEntity<>(HttpStatus.valueOf(401));
        }

    }

    @PostMapping("/google-login")
    public ResponseEntity<AuthenticationResponse> googleAuthentication(@RequestBody GoogleLoginDto googleLoginDto) {
        try {
            return ResponseEntity.ok(service.googleAuthenticate(googleLoginDto));
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.valueOf(400));
        }
    }


}
