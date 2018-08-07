package com.condescendors.pollingapp.pollingapp.web.rest.vm;

import com.condescendors.pollingapp.pollingapp.constants.AppConstants;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

public class LoginVM implements Serializable{

    @NotBlank
    @Size(min = 1,max = 50)
    private String login;

    @NotBlank
    @Size(min = AppConstants.PASSWORD_MIN_LENGTH,max = AppConstants.PASSWORD_MAX_LENGTH)
    private String password;

    private Boolean rememberMe;

    public LoginVM() {
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getRememberMe() {
        return rememberMe;
    }

    public void setRememberMe(Boolean rememberMe) {
        this.rememberMe = rememberMe;
    }
}
