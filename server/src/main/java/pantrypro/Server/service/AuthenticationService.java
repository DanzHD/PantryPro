package pantrypro.Server.service;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import pantrypro.Server.Enums.Role;
import pantrypro.Server.dto.AuthenticationRequest;
import pantrypro.Server.dto.AuthenticationResponse;
import pantrypro.Server.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import pantrypro.Server.model.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pantrypro.Server.repository.UserRepository;
import pantrypro.Server.util.UserAlreadyExistsException;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) throws UserAlreadyExistsException {

        if (userExists(request.getEmail())) {
            throw new UserAlreadyExistsException();
        }

        var user = User.builder()
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.USER)
            .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse
            .builder()
            .token(jwtToken)
            .build();

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        var user = userRepository.findByEmail(request.getEmail())
            .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse
            .builder()
            .token(jwtToken)
            .build();
    }

    public boolean userExists(String email) {
        Optional<User> userContainer = userRepository.findByEmail(email);
        return userContainer.isPresent();
    }

    /**
     * Validates that the password is strong enough with the following policies:
     * At least 8 characters and at most 20 characters
     * Contains at least one digit
     * Contains at least one lower and upper alphabetical character
     * Contains at least 1 special character
     * Does not contain any white space
     *
     */
    public boolean passwordIsValid(String password) {
        Pattern pattern = Pattern.compile("^(?=.*[0-9])"
                + "(?=.*[a-z])(?=.*[A-Z])"
                + "(?=.*[@#$%^&+=])"
                + "(?=\\S+$).{8,20}$");

        return pattern.matcher(password).matches();
    }

}
