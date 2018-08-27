package com.condescendors.pollingapp.pollingapp.web.rest.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestAlertException extends RuntimeException{

    public BadRequestAlertException(String message) {
        super(message);
    }

    public BadRequestAlertException(String message, Throwable cause) {
        super(message, cause);
    }

}
