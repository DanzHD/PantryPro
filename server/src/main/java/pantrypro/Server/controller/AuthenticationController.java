package pantrypro.Server.controller;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import pantrypro.Server.dto.AuthenticationRequest;
import pantrypro.Server.dto.AuthenticationResponse;
import pantrypro.Server.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pantrypro.Server.service.AuthenticationService;
import pantrypro.Server.util.UserAlreadyExistsException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {

        try {
            return ResponseEntity.ok(service.register(request));
        } catch (UserAlreadyExistsException exception) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } catch (Exception exception) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {

        return ResponseEntity.ok(service.authenticate(request));
    }

}
