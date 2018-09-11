package com.condescendors.pollingapp.pollingapp.payloads;

import java.io.Serializable;
import java.util.List;

public class UserPollsDTO extends UserSummary implements Serializable{

    private List<PollResponse> polls;

    public List<PollResponse> getPolls() {
        return polls;
    }

    public void setPolls(List<PollResponse> polls) {
        this.polls = polls;
    }

    public UserPollsDTO(Long id, String userName, String name,List<PollResponse> polls) {
        super(id, userName, name);
        this.polls=polls;
    }
}
