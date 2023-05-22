package com.camean.camean.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

public class CaminWithMedianReviews {
    @Id
    private ObjectId id;
    private String name;
    private String city;
    private String owner;
    private Float stars;
    private Boolean parking;
    private Boolean elevator;
    private Boolean bath;
    private Boolean kitchen;
    private String sex;
    private Integer pricePerMonth;

    public CaminWithMedianReviews(ObjectId id, String name, String city, String owner, Float stars, Boolean parking, Boolean elevator, Boolean bath, Boolean kitchen, String sex, Integer pricePerMonth) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.owner = owner;
        this.stars = stars;
        this.parking = parking;
        this.elevator = elevator;
        this.bath = bath;
        this.kitchen = kitchen;
        this.sex = sex;
        this.pricePerMonth = pricePerMonth;
    }

    @Override
    public String toString() {
        return "CaminWithMedianReviews{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", city='" + city + '\'' +
                ", owner='" + owner + '\'' +
                ", stars=" + stars +
                ", parking=" + parking +
                ", elevator=" + elevator +
                ", bath=" + bath +
                ", kitchen=" + kitchen +
                ", sex='" + sex + '\'' +
                ", pricePerMonth=" + pricePerMonth +
                '}';
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
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

    public Float getStars() {
        return stars;
    }

    public void setStars(Float stars) {
        this.stars = stars;
    }

    public Boolean getParking() {
        return parking;
    }

    public void setParking(Boolean parking) {
        this.parking = parking;
    }

    public Boolean getElevator() {
        return elevator;
    }

    public void setElevator(Boolean elevator) {
        this.elevator = elevator;
    }

    public Boolean getBath() {
        return bath;
    }

    public void setBath(Boolean bath) {
        this.bath = bath;
    }

    public Boolean getKitchen() {
        return kitchen;
    }

    public void setKitchen(Boolean kitchen) {
        this.kitchen = kitchen;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Integer getPricePerMonth() {
        return pricePerMonth;
    }

    public void setPricePerMonth(Integer pricePerMonth) {
        this.pricePerMonth = pricePerMonth;
    }
}
