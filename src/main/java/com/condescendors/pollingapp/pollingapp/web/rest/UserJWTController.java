package com.condescendors.pollingapp.pollingapp.web.rest;


import com.condescendors.pollingapp.pollingapp.constants.AppConstants;
import com.condescendors.pollingapp.pollingapp.security.jwt.TokenProvider;
import com.condescendors.pollingapp.pollingapp.web.rest.vm.LoginVM;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
public class UserJWTController {

    private final Logger log= LoggerFactory.getLogger(UserJWTController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider tokenProvider;


    @PostMapping("/authenticate")
    public ResponseEntity<JWTToken> authenticate(@Valid @RequestBody LoginVM loginVM){
        Authentication authentication=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginVM.getLogin(),loginVM.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        boolean rememberMe=(loginVM.getRememberMe()==null)?false:loginVM.getRememberMe();
        String token=tokenProvider.createToken(authentication,rememberMe);

        HttpHeaders headers=new HttpHeaders();
        headers.add(AppConstants.AUTH_HEADER,"Bearer "+token);
        return new ResponseEntity<JWTToken>(new JWTToken(token),headers, HttpStatus.OK);
    }

    static class JWTToken{

        @JsonProperty(value = "id_token")
        public String getIdToken() {
            return idToken;
        }

        public void setIdToken(String idToken) {
            this.idToken = idToken;
        }

        private String idToken;

        public JWTToken(String idToken) {
            this.idToken = idToken;
        }
    }
}
