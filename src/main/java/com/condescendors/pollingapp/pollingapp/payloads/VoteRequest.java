package com.condescendors.pollingapp.pollingapp.payloads;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class VoteRequest implements Serializable{

    @NotNull
    private Long choiceId;

    public Long getChoiceId() {
        return choiceId;
    }

    public void setChoiceId(Long choiceId) {
        this.choiceId = choiceId;
    }
}
