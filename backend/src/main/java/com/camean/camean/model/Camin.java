package com.camean.camean.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "camine")
public class Camin {
    private String name;
    private String city;
    private String university;
    private Float rating;

    public Camin() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    @Override
    public String toString() {
        return "Camin{" +
                "name='" + name + '\'' +
                ", city='" + city + '\'' +
                ", university='" + university + '\'' +
                ", rating=" + rating +
                '}';
    }
}
