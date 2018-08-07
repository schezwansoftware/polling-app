package com.condescendors.pollingapp.pollingapp.security.jwt;

import com.condescendors.pollingapp.pollingapp.config.ApplicationProperties;
import com.condescendors.pollingapp.pollingapp.security.UserPrincipal;
import com.sun.org.apache.xpath.internal.operations.Bool;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Date;

@Component
public class TokenProvider {
    private Logger log = LoggerFactory.getLogger(TokenProvider.class);

    @Autowired
    private ApplicationProperties applicationProperties;

    private String jwtSecret;

    private static final String AUTHORITIES_KEY = "auth";

    private long tokenValidityInMilliSeconds;

    private long tokenValidityInMilliSecondsForRememberMe;

    @PostConstruct
    public void init() {
        this.jwtSecret = applicationProperties.getSecurity().getAuthentication().getJwt().getSecret();
        this.tokenValidityInMilliSeconds = 1000 * applicationProperties.getSecurity().getAuthentication().getJwt().getTokenValidityInSeconds();
        this.tokenValidityInMilliSecondsForRememberMe = 1000 * applicationProperties.getSecurity().getAuthentication().getJwt().getTokenValidityInSecondsForRememberMe();
    }


    public String createToken(Authentication authentication, boolean rememberMe) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        long now = new Date().getTime();

        Date expiryDate = null;
        if (rememberMe) {
            expiryDate = new Date(now + this.tokenValidityInMilliSecondsForRememberMe);
        } else {
            expiryDate = new Date(now + this.tokenValidityInMilliSeconds);
        }

        return Jwts.builder()
                .setSubject(Long.toString(userPrincipal.getId()))
                .setIssuedAt(new Date())
                .claim(AUTHORITIES_KEY, authentication)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .setExpiration(expiryDate).compact();
    }

    public Long getUserFromJWT(String authToken) {
        Claims claims = Jwts
                .parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(authToken).getBody();
        return Long.parseLong(claims.getSubject());
    }


    public Boolean validateToken(String authToken){
       try {
           Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
       }catch (SignatureException exception){

           log.error("Invalid JWT Signature");
       }catch (MalformedJwtException exception){
           log.error("Malformed jwt Signature");
       }catch (ExpiredJwtException exception){
           log.error("Expired JWT Exception");
       }catch (UnsupportedJwtException exception){
           log.error("Unsupported Jwt");
       }catch (IllegalArgumentException exception){
           log.error("JWT name Cannot be null");
       }
        return false;
    }

}
