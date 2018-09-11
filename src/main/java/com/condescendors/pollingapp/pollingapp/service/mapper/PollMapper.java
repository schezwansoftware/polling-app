package com.condescendors.pollingapp.pollingapp.service.mapper;

import com.condescendors.pollingapp.pollingapp.models.Choice;
import com.condescendors.pollingapp.pollingapp.models.Poll;
import com.condescendors.pollingapp.pollingapp.payloads.ChoiceResponse;
import com.condescendors.pollingapp.pollingapp.payloads.PollResponse;
import com.condescendors.pollingapp.pollingapp.payloads.UserSummary;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PollMapper {

    public List<PollResponse> toResponse(List<Poll> polls) {
        List<PollResponse> pollResponses = new ArrayList<>();
        for (Poll poll : polls) {
            PollResponse pollResponse = new PollResponse();
            pollResponse.setId(poll.getId());
            pollResponse.setQuestion(poll.getQuestion());
            pollResponse.setExpirationDateTime(poll.getExpiryTime());
            List<ChoiceResponse> choiceResponses = new ArrayList<>();
            for (Choice choice : poll.getChoices()) {
                ChoiceResponse choiceResponse = new ChoiceResponse();
                choiceResponse.setId(choice.getId());
                choiceResponse.setText(choice.getText());
                choiceResponses.add(choiceResponse);
            }
            pollResponse.setChoices(choiceResponses);

            pollResponses.add(pollResponse);
        }
        return pollResponses;
    }
}
