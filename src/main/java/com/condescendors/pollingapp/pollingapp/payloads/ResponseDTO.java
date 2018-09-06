package com.condescendors.pollingapp.pollingapp.payloads;

import java.io.Serializable;

public class ResponseDTO implements Serializable{

    private String response;

    public ResponseDTO() {
    }

    public ResponseDTO(String response) {
        this.response = response;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
