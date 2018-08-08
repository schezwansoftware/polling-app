package com.condescendors.pollingapp.pollingapp.web.rest;

import com.condescendors.pollingapp.pollingapp.constants.AppConstants;
import com.condescendors.pollingapp.pollingapp.models.Poll;
import com.condescendors.pollingapp.pollingapp.payloads.PagedResponse;
import com.condescendors.pollingapp.pollingapp.payloads.PollRequest;
import com.condescendors.pollingapp.pollingapp.payloads.PollResponse;
import com.condescendors.pollingapp.pollingapp.payloads.VoteRequest;
import com.condescendors.pollingapp.pollingapp.security.CurrentUser;
import com.condescendors.pollingapp.pollingapp.security.UserPrincipal;
import com.condescendors.pollingapp.pollingapp.service.PollService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api")
public class PollsController {

    private static final Logger logger = LoggerFactory.getLogger(PollsController.class);

    private final PollService pollService;

    public PollsController(PollService pollService) {
        this.pollService = pollService;
    }


    @GetMapping("/polls")
    public PagedResponse<PollResponse> getPolls(@CurrentUser UserPrincipal currentUser,
                                                @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return pollService.findAllPolls(currentUser, page, size);
    }

    @PostMapping("/polls")
    public ResponseEntity<String> createPoll(@Valid @RequestBody PollRequest pollRequest) {
        Poll poll = pollService.createPoll(pollRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{pollId}")
                .buildAndExpand(poll.getId()).toUri();

        return ResponseEntity.created(location)
                .body( "Poll Created Successfully");
    }


    @GetMapping("/polls/{pollId}")
    public PollResponse getPollById(@CurrentUser UserPrincipal currentUser,
                                    @PathVariable Long pollId) {
        return pollService.getPollById(pollId, currentUser);
    }

    @PostMapping("/polls/{pollId}/votes")
    public PollResponse castVote(@CurrentUser UserPrincipal currentUser,
                                 @PathVariable Long pollId,
                                 @Valid @RequestBody VoteRequest voteRequest) {
        return pollService.castVoteAndGetUpdatedPoll(pollId, voteRequest, currentUser);
    }


    @GetMapping("/polls/{username}")
    public PagedResponse<PollResponse> getPollsCreatedBy(@PathVariable(value = "username") String username,
                                                         @CurrentUser UserPrincipal currentUser,
                                                         @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                         @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return pollService.getPollsCreatedBy(username, currentUser, page, size);
    }



    @GetMapping("/polls/{username}/votes")
    public PagedResponse<PollResponse> getPollsVotedBy(@PathVariable(value = "username") String username,
                                                       @CurrentUser UserPrincipal currentUser,
                                                       @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                       @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        return pollService.getPollsVotedBy(username, currentUser, page, size);
    }
}
