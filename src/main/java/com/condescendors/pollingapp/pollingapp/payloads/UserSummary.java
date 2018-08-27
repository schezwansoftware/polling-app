package com.condescendors.pollingapp.pollingapp.payloads;

import java.io.Serializable;

public class UserSummary implements Serializable{

    private Long id;

    private String userName;

    private String name;

    public UserSummary(Long id, String userName, String name) {
        this.id = id;
        this.userName = userName;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
