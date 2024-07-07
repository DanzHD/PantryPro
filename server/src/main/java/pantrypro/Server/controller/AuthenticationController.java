package pantrypro.Server.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.coyote.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import pantrypro.Server.dto.AuthenticationRequest;
import pantrypro.Server.dto.AuthenticationResponse;
import pantrypro.Server.dto.EnableAccountDto;
import pantrypro.Server.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pantrypro.Server.repository.UserRepository;
import pantrypro.Server.service.AuthenticationService;
import pantrypro.Server.service.JwtService;
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
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

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




}
