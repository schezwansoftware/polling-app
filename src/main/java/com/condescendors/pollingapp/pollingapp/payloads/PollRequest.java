package com.condescendors.pollingapp.pollingapp.payloads;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class PollRequest implements Serializable{

    @NotBlank
    @Size(min = 5,max = 200)
    private String question;

    @NotNull
    @Valid
    @Size(max = 6,min = 2)
    private List<ChoiceRequest> choices;

    @NotNull
    @Valid
    private PollLength pollLength;


    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<ChoiceRequest> getChoices() {
        return choices;
    }

    public void setChoices(List<ChoiceRequest> choices) {
        this.choices = choices;
    }

    public PollLength getPollLength() {
        return pollLength;
    }

    public void setPollLength(PollLength pollLength) {
        this.pollLength = pollLength;
    }
}
