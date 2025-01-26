package pantrypro.Server.service;

import com.fasterxml.jackson.core.JsonFactory;
import com.google.api.client.auth.openidconnect.IdToken;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import pantrypro.Server.Enums.Role;
import pantrypro.Server.dto.GoogleLoginDto;
import pantrypro.Server.model.User;
import pantrypro.Server.dto.AuthenticationRequest;
import pantrypro.Server.dto.AuthenticationResponse;
import pantrypro.Server.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pantrypro.Server.repository.UserRepository;
import pantrypro.Server.util.AccountEnabledException;
import pantrypro.Server.util.InvalidTokenException;
import pantrypro.Server.util.PasswordTooWeakException;
import pantrypro.Server.util.UserAlreadyExistsException;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collection;
import java.util.Collections;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    /**
     * Registers a new user into the database and returns an access token if registration is successful
     * Throws an exception if user email is already taken or password is too weak
     */
    public HttpStatus register(RegisterRequest request)
            throws UserAlreadyExistsException, PasswordTooWeakException {

        Optional<User> user = userRepository.findByEmail(request.getEmail());

        if (user.isPresent() && (user.get().isEnabled()
            || (user.get().getVerificationToken() != null) && !jwtService.isTokenExpired(user.get().getVerificationToken()))) {
            throw new UserAlreadyExistsException();
        }

        if (!passwordIsValid(request.getPassword())) {
            throw new PasswordTooWeakException();
        }

        if (user.isPresent() && user.get().isUseOtherLogin()) {
            String verificationToken = jwtService.generateVerificationToken(user.get());

            user.get()
                .setPassword(passwordEncoder.encode(request.getPassword()));
            user.get()
                .setVerificationToken(verificationToken);
            emailService.sendEnableUserEmail(user.get(), verificationToken);
            userRepository.save(user.get());

            return HttpStatus.ACCEPTED;

        }

        /* Previous user taken too long to verify account and hasn't signed up using other login methods */
        user.ifPresent(userRepository::delete);

        var newUser = User.builder()
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .enabled(false)
            .allowEmailNotifications(true)
            .role(Role.USER)
            .useOtherLogin(false)
            .build();

        String verificationToken = jwtService.generateVerificationToken(newUser);
        newUser.setVerificationToken(verificationToken);
        emailService.sendEnableUserEmail(newUser, verificationToken);
        userRepository.save(newUser);
        return HttpStatus.ACCEPTED;


    }




    public AuthenticationResponse enableUser(String verificationToken) {
        String userEmail = jwtService.extractUsername(verificationToken);
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow();
        if (!jwtService.isTokenValid(verificationToken, user)) {
            throw new InvalidTokenException();
        }
        if (user.isEnabled()) {
            throw new AccountEnabledException();
        }


        user.setEnabled(true);

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
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow();
        if (!user.isEnabled()) {
            throw new AccountEnabledException();
        }

        var jwtToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        return AuthenticationResponse
            .builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();
    }



    /**
     * Validates that the password is strong enough with the following policies:
     * At least 8 characters
     * Contains at least one digit
     * Contains at least one lower and upper alphabetical character
     * Contains at least 1 special character
     *
     */
    public boolean passwordIsValid(String password) {

        Pattern pattern = Pattern.compile("^(?=.*[0-9])"
                + "(?=.*[a-z])"
                + "(?=.*[A-Z])"
                + "(?=.*[!@#$%^&*()-=+_])"
                + "(.{8,}$)");

        return pattern.matcher(password).matches();
    }

    /**
     * Sends back a new access token with the refresh token
     *
     */
    public AuthenticationResponse refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String refreshToken;
        final String userEmail;

        final String authHeader = validateAuthHeader(request);
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

    public AuthenticationResponse googleAuthenticate(GoogleLoginDto googleLoginDto) throws GeneralSecurityException, IOException {
        HttpTransport transport = new NetHttpTransport();
        GsonFactory jsonFactory = new GsonFactory();
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
            .setAudience(Collections.singletonList(System.getenv("GOOGLE_CLIENT_ID")))
            .build();

        System.out.println(googleLoginDto.getGoogleToken());
        GoogleIdToken idToken = verifier.verify(googleLoginDto.getGoogleToken());
        if (idToken == null) {
            throw new InvalidTokenException();
        }
        Payload payload = idToken.getPayload();
        String userEmail = payload.getEmail();

        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        User user;

        if (userOptional.isEmpty()) {
            user = User.builder()
                .verificationToken(null)
                .email(userEmail)
                .role(Role.USER)
                .useOtherLogin(true)
                .password(null)
                .build();
            userRepository.save(user);
        } else {
            user = userOptional.get();
            user.setUseOtherLogin(true);
        }


        var jwtToken = jwtService.generateAccessToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        return AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .build();
    }

    public String validateAuthHeader(HttpServletRequest request) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new InvalidTokenException();
        }

        return authHeader;
    }





}
