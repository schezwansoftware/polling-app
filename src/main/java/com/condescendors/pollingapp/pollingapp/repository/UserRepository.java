package com.condescendors.pollingapp.pollingapp.repository;

import com.condescendors.pollingapp.pollingapp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User> findByUserName(String userName);

    Optional<User> findByUserNameOrEmail(String userName,String email);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);
}
