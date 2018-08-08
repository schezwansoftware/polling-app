package com.condescendors.pollingapp.pollingapp.web.rest;


import com.condescendors.pollingapp.pollingapp.models.User;
import com.condescendors.pollingapp.pollingapp.repository.UserRepository;
import com.condescendors.pollingapp.pollingapp.web.rest.util.ResponseUtil;
import com.condescendors.pollingapp.pollingapp.web.rest.vm.ManagedUserVM;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    private final Logger log=LoggerFactory.getLogger(UserController.class);

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getAuthentication(@PathVariable("id") Long id){
     log.info("Rest Request to get a user with id, {}",id);
        return ResponseUtil.wrapOrNotFound(userRepository.findById(id));
    }
}
