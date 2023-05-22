package com.camean.camean.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "camine")
public class Camin {
    @Id
    private ObjectId id;
    private String name;
    private String city;
    private String owner;
    private ArrayList<Review> reviews;

    public Camin(ObjectId id, String name, String city, String owner, ArrayList<Review> reviews) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.owner = owner;
        this.reviews = reviews;
    }

    @Override
    public String toString() {
        return "Camin{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", city='" + city + '\'' +
                ", owner='" + owner + '\'' +
                ", reviews=" + reviews +
                '}';
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getId() {
        return id;
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

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public ArrayList<Review> getReviews() {
        return reviews;
    }

    public void setReviews(ArrayList<Review> reviews) {
        this.reviews = reviews;
    }

    public void addReview(Review review) {
        this.reviews.add(review);
    }
}
