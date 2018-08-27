package com.condescendors.pollingapp.pollingapp.security;

import com.condescendors.pollingapp.pollingapp.models.User;
import com.condescendors.pollingapp.pollingapp.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class CustomUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userNameOrEmail) throws UsernameNotFoundException {
        User user=userRepository.findByUserNameOrEmail(userNameOrEmail,userNameOrEmail).orElseThrow(()->new UsernameNotFoundException("User not found with username or email : " + userNameOrEmail));
        return UserPrincipal.createUser(user);
    }

    @Transactional
    public UserDetails loadUserById(Long id){
        User user=userRepository.findById(id).orElseThrow(()->new UsernameNotFoundException("User not found with id : " + id));
        return UserPrincipal.createUser(user);
    }
}
