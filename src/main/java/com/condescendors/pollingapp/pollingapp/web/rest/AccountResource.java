package com.condescendors.pollingapp.pollingapp.web.rest;

import com.condescendors.pollingapp.pollingapp.models.Authorities;
import com.condescendors.pollingapp.pollingapp.models.Authority;
import com.condescendors.pollingapp.pollingapp.models.User;
import com.condescendors.pollingapp.pollingapp.repository.UserRepository;
import com.condescendors.pollingapp.pollingapp.web.rest.error.AppException;
import com.condescendors.pollingapp.pollingapp.web.rest.error.BadRequestAlertException;
import com.condescendors.pollingapp.pollingapp.web.rest.vm.ManagedUserVM;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class AccountResource {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public AccountResource(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/account/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<User> registerUser(@Valid @RequestBody ManagedUserVM managedUserVM){

        userRepository.findByUserNameOrEmail(managedUserVM.getUserName(),managedUserVM.getEmail()).ifPresent(user -> {throw new AppException("User Name Already Taken");});

        Set<Authority> authorities=new HashSet<>();
        Authority authority=new Authority();
        authority.setName(Authorities.ROLE_USER);
        authorities.add(authority);
        String password=passwordEncoder.encode(managedUserVM.getPassword());
        User user=new User(managedUserVM.getFirstName(),managedUserVM.getLastName(),managedUserVM.getUserName(),managedUserVM.getEmail(),password,authorities);
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }


    @GetMapping("/account/email-available/{email}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void checkEmailAvailabiltiy(@PathVariable String email){
        userRepository.findByEmail(email).ifPresent(user -> {throw new BadRequestAlertException("Email already exists");});
    }

    @GetMapping("/account/username-available/{username}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void checkUserNameAvailability(@PathVariable String username){
        userRepository.findByUserName(username).ifPresent(user -> { throw new BadRequestAlertException("Email already exists");});
    }
}
