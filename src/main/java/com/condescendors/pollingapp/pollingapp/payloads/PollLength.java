package com.condescendors.pollingapp.pollingapp.payloads;

import javax.validation.constraints.Size;
import java.io.Serializable;

public class PollLength implements Serializable{

    @Size(max = 7)
    private Integer days;

    @Size(max = 23)
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
