package com.condescendors.pollingapp.pollingapp.models;


import com.condescendors.pollingapp.pollingapp.models.audit.UserDateAudit;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Table(name = "polls")
@Entity
public class Poll extends UserDateAudit implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Size(min = 5,max = 200)
    private String question;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "poll",
            orphanRemoval = false
    )
    @Size(max = 6,min = 2)
    @BatchSize(size = 30)
    private List<Choice> choices=new ArrayList<>();

    @NotNull
    private Instant expiryTime;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public List<Choice> getChoices() {
        return choices;
    }

    public void setChoices(List<Choice> choices) {
        this.choices = choices;
    }

    public Instant getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(Instant expiryTime) {
        this.expiryTime = expiryTime;
    }


    public void addChoice(Choice choice){
        this.choices.add(choice);
    }

    public void removeChoice(Choice choice){
        this.choices.remove(choice);
    }


    @Override
    public String toString() {
        return "Choice{" +
                "id=" + getId() +
                ", question='" + getQuestion() + "'" +
                ", expirytime='" + getExpiryTime() + "'" +
                ", choices='" + getChoices() + "'" +
                "}";
    }
}
