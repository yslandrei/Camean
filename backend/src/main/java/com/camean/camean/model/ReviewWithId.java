package com.camean.camean.model;
import com.camean.camean.model.Review;
import org.bson.types.ObjectId;

public class ReviewWithId extends Review {
    private ObjectId caminId;

    public ReviewWithId(ObjectId caminId, String author, Integer stars, String text, String date, Facility facilities) {
        super(author, stars, text, date, facilities);
        this.caminId = caminId;
    }

    @Override
    public String toString() {
        return "ReviewWithId{" +
                "caminId='" + caminId + '\'' +
                ", author='" + author + '\'' +
                ", stars=" + stars +
                ", text='" + text + '\'' +
                ", date='" + date + '\'' +
                ", facilities=" + facilities +
                '}';
    }

    public ObjectId getCaminId() {
        return caminId;
    }

    public void setCaminId(ObjectId caminId) {
        this.caminId = caminId;
    }
}
