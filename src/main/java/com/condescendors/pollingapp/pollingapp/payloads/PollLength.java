package com.condescendors.pollingapp.pollingapp.payloads;

import javax.validation.constraints.Size;
import java.io.Serializable;

public class PollLength implements Serializable{

    private Integer days;

    private Integer hours;


    public Integer getDays() {
        return days;
    }

    public void setDays(Integer days) {
        this.days = days;
    }

    public Integer getHours() {
        return hours;
    }

    public void setHours(Integer hours) {
        this.hours = hours;
    }
}
