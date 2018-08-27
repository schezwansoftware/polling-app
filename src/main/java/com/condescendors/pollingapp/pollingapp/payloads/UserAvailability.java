package com.condescendors.pollingapp.pollingapp.payloads;

import java.io.Serializable;

public class UserAvailability implements Serializable{

    private Boolean availability;

    public Boolean getAvailability() {
        return availability;
    }

    public void setAvailability(Boolean availability) {
        this.availability = availability;
    }
}
