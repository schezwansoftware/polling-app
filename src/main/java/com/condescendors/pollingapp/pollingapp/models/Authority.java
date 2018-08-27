package com.condescendors.pollingapp.pollingapp.models;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "authority")
public class Authority implements Serializable {

    @Enumerated(EnumType.STRING)
    @Id
    @Column(length = 60)
    private Authorities name;


    public Authority() {
    }

    public Authorities getName() {
        return name;
    }

    public void setName(Authorities name) {
        this.name = name;
    }
}
