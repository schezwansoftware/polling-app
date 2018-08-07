package com.condescendors.pollingapp.pollingapp.web.rest.vm;

import com.condescendors.pollingapp.pollingapp.constants.AppConstants;
import com.condescendors.pollingapp.pollingapp.models.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

public class ManagedUserVM  extends User implements Serializable{

    @NotBlank
    @Size(min = AppConstants.PASSWORD_MIN_LENGTH,max = AppConstants.PASSWORD_MAX_LENGTH)
    private String password;

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
    }
}
