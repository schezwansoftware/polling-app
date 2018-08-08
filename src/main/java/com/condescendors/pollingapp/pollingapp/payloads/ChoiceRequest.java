package com.condescendors.pollingapp.pollingapp.payloads;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

public class ChoiceRequest implements Serializable{

    @NotBlank
    @Size(min = 4,max = 50)
    private String text;


    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
