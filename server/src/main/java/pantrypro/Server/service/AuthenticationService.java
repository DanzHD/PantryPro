package pantrypro.Server.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
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
import pantrypro.Server.util.InvalidTokenException;
import pantrypro.Server.util.PasswordTooWeakException;
import pantrypro.Server.util.UserAlreadyExistsException;

import java.io.IOException;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Registers a new user into the database and returns an access token if registration is successful
     * Throws an exception if user email is already taken or password is too weak
     */
    public AuthenticationResponse register(RegisterRequest request)
            throws UserAlreadyExistsException, PasswordTooWeakException {

        if (userExists(request.getEmail())) {
            throw new UserAlreadyExistsException();
        }

        if (!passwordIsValid(request.getPassword())) {
            throw new PasswordTooWeakException();
        }

        var user = User.builder()
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.USER)
            .build();

        userRepository.save(user);
        var jwtToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        return AuthenticationResponse
            .builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();

    }

    /**
     * Validates that the user's password and email matches.
     * If matches, returns the access token
     */
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        var user = userRepository.findByEmail(request.getEmail())
            .orElseThrow();

        var jwtToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        return AuthenticationResponse
            .builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();
    }

    /**
     * Checks that an email exists within the database
     */
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
                + "(?=\\S+$).{8,100}$");

        return pattern.matcher(password).matches();
    }

    /**
     * Sends back a new access token with the refresh token
     *
     * @return
     */
    public AuthenticationResponse refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            throw new InvalidTokenException();
        }
        refreshToken = authHeader.substring(7);


        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.userRepository.findByEmail(userEmail)
                .orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                var accessToken = jwtService.generateAccessToken(user);
                return AuthenticationResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .build();

            }
        }

        throw new InvalidTokenException();


    }

}
