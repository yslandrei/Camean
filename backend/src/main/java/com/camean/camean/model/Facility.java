package com.camean.camean.model;

public class Facility {
    private Boolean parking;
    private Boolean elevator;
    private Boolean bath;
    private Boolean kitchen;
    private String sex;
    private Integer pricePerMonth;
    private Integer peoplePerRoom;

    public Facility(Boolean parking, Boolean elevator, Boolean bath, Boolean kitchen, String sex, Integer pricePerMonth, Integer peoplePerRoom) {
        this.parking = parking;
        this.elevator = elevator;
        this.bath = bath;
        this.kitchen = kitchen;
        this.sex = sex;
        this.pricePerMonth = pricePerMonth;
        this.peoplePerRoom = peoplePerRoom;
    }

    @Override
    public String toString() {
        return "Facility{" +
                "parking=" + parking +
                ", elevator=" + elevator +
                ", bath=" + bath +
                ", kitchen=" + kitchen +
                ", sex='" + sex + '\'' +
                ", pricePerMonth=" + pricePerMonth +
                ", peoplePerRoom=" + peoplePerRoom +
                '}';
    }

    public Integer getPeoplePerRoom() {
        return peoplePerRoom;
    }

    public void setPeoplePerRoom(Integer peoplePerRoom) {
        this.peoplePerRoom = peoplePerRoom;
    }

    public void setParking(Boolean parking) {
        this.parking = parking;
    }

    public void setElevator(Boolean elevator) {
        this.elevator = elevator;
    }

    public void setBath(Boolean bath) {
        this.bath = bath;
    }

    public void setKitchen(Boolean kitchen) {
        this.kitchen = kitchen;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public void setPricePerMonth(Integer pricePerMonth) {
        this.pricePerMonth = pricePerMonth;
    }

    public Boolean getParking() {
        return parking;
    }

    public Boolean getElevator() {
        return elevator;
    }

    public Boolean getBath() {
        return bath;
    }

    public Boolean getKitchen() {
        return kitchen;
    }

    public String getSex() {
        return sex;
    }

    public Integer getPricePerMonth() {
        return pricePerMonth;
    }
}
