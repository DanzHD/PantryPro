package pantrypro.Server.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import pantrypro.Server.model.User;
import pantrypro.Server.repository.UserRepository;
import pantrypro.Server.util.InvalidTokenException;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final UserRepository userRepository;
    private static final String SECRET_KEY = System.getenv("SECRET_KEY");

    /**
     *
     * Gets the username from an access token
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts a particular claim from the access token
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Creates a new jwt token
     */
    public String generateToken(Map<String, Object> extractClaims, UserDetails userDetails, long expiration) {

        String accessToken = Jwts.builder()
            .setClaims(extractClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
        return accessToken;
    }

    /**
     *
     * Creates new jwt access token
     */
    public String generateAccessToken(UserDetails userDetails) {
        /* Access token lasts 30 minutes */
        return generateToken(new HashMap<>(), userDetails, 1800000);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails, 1000000000);
    }


    /**
     * Validates that an access token has not expired and matches the user
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    /**
     * Checks whether an access token is expired
     */
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Gets the expiration date from the access token
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Gets all claims within the token
     */
    private Claims extractAllClaims(String token) {
        return Jwts
            .parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .getBody();

    }

    /**
     *
     * Creates a signing key
     */
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);

        return Keys.hmacShaKeyFor(keyBytes);
    }





}
