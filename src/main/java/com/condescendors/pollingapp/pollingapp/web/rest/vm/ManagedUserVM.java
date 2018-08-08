package com.condescendors.pollingapp.pollingapp.web.rest.vm;

import com.condescendors.pollingapp.pollingapp.constants.AppConstants;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;

public class ManagedUserVM implements Serializable{

    @NotBlank
    @Size(min = AppConstants.PASSWORD_MIN_LENGTH,max = AppConstants.PASSWORD_MAX_LENGTH)
    private String password;

    @NotBlank
    @Size(min = 4,max = 25)
    private String firstName;

    @NotBlank
    @Size(min = 4,max = 25)
    private String lastName;

    @NotBlank
    @Size(min = 4,max = 25)
    private String userName;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @NotBlank
    @Size(min = 4,max = 100)
    private String email;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    @Override
    public String toString() {
        return "LoginVM{" +
                "username='" + userName + '\'' +
                ", firstName=" + firstName +
                ", lastName=" + lastName +
                ", email=" + email +
                ", password=" + password +
                '}';
    }
}
