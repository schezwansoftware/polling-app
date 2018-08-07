package com.condescendors.pollingapp.pollingapp.web.rest.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class AppException extends RuntimeException{

    public AppException(String s) {
        super(s);
    }

    public AppException(String s, Throwable throwable) {
        super(s, throwable);
    }
}
