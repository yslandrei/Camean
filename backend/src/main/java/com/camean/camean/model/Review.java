package com.camean.camean.model;

public class Review {
    protected String author;
    protected Integer stars;
    protected String text;
    protected String date;
    protected Facility facilities;

    public Review(String author, Integer stars, String text, String date, Facility facilities) {
        this.author = author;
        this.stars = stars;
        this.text = text;
        this.date = date;
        this.facilities = facilities;
    }

    @Override
    public String toString() {
        return "Rating{" +
                "author='" + author + '\'' +
                ", stars=" + stars +
                ", text='" + text + '\'' +
                ", date=" + date +
                ", facilities=" + facilities +
                '}';
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setFacilities(Facility facilities) {
        this.facilities = facilities;
    }

    public String getAuthor() {
        return author;
    }

    public Integer getStars() {
        return stars;
    }

    public String getText() {
        return text;
    }

    public String getDate() {
        return date;
    }

    public Facility getFacilities() {
        return facilities;
    }
}
