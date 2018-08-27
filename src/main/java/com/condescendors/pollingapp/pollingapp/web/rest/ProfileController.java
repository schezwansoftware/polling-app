package com.condescendors.pollingapp.pollingapp.web.rest;


import com.condescendors.pollingapp.pollingapp.models.User;
import com.condescendors.pollingapp.pollingapp.payloads.UserProfile;
import com.condescendors.pollingapp.pollingapp.repository.PollRepository;
import com.condescendors.pollingapp.pollingapp.repository.UserRepository;
import com.condescendors.pollingapp.pollingapp.repository.VoteRepository;
import com.condescendors.pollingapp.pollingapp.web.rest.error.ResourceNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ProfileController {

    private final UserRepository userRepository;

    private final PollRepository pollRepository;

    private final VoteRepository voteRepository;

    public ProfileController(UserRepository userRepository, PollRepository pollRepository, VoteRepository voteRepository) {
        this.userRepository = userRepository;
        this.pollRepository = pollRepository;
        this.voteRepository = voteRepository;
    }

    @GetMapping("/profile/{login}")
    public UserProfile getUserProfileByLogin(@PathVariable("login")String login){
        User user=userRepository.findByUserName(login).orElseThrow(()->new ResourceNotFoundException("user","userName",login));

        long pollCount = pollRepository.countByCreatedBy(user.getId());
        long voteCount = voteRepository.countByUserId(user.getId());

        return new UserProfile(user.getId(),login,user.getFirstName()+""+user.getLastName(),user.getCreatedAt(),pollCount,voteCount);
    }
}
