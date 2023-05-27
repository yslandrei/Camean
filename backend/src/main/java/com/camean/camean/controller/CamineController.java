package com.camean.camean.controller;

import com.camean.camean.controller.repository.CamineRepository;
import com.camean.camean.model.Camin;
import com.camean.camean.model.CaminWithMedianReviews;
import com.camean.camean.model.Review;
import com.camean.camean.model.ReviewWithId;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CamineController {

    @Autowired
    MongoClient mongoClient;

    @Autowired
    MongoConverter mongoConverter;

    @Autowired
    CamineRepository cRepo;

    @GetMapping("/getCamine/all")
    public List<Camin> getAllCamine() {
        return cRepo.findAll();
    }

    @GetMapping("/getCamine/id={id}")
    public CaminWithMedianReviews getCaminWithMedianReviewsById(@PathVariable String id) {
        ObjectId objectId = new ObjectId(id);
        Optional<Camin> optionalCamin = cRepo.findById(objectId);
        Camin foundCamin = optionalCamin.get();

        float starsSum = 0;
        int parkingTrue = 0, elevatorTrue = 0, bathTrue = 0, kitchenTrue = 0;
        Map<String, Integer> sexMap = new HashMap<>();
        Map<Integer, Integer> pricePerMonthMap = new HashMap<>();
        Map<Integer, Integer> peoplePerRoomMap = new HashMap<>();

        int mostUsedPricePerMonth = 0, mostUsedPricePerMonthUses = 0;
        int mostUsedPeoplePerRoom = 0, mostUsedPeoplePerRoomUses = 0;
        for(int j = 0; j < foundCamin.getReviews().size(); j ++) {
            Review reviewCamin = foundCamin.getReviews().get(j);

            starsSum += reviewCamin.getStars();
            parkingTrue += reviewCamin.getFacilities().getParking() ? 1 : 0;
            elevatorTrue += reviewCamin.getFacilities().getElevator() ? 1 : 0;
            bathTrue += reviewCamin.getFacilities().getBath() ? 1 : 0;
            kitchenTrue += reviewCamin.getFacilities().getKitchen() ? 1 : 0;
            sexMap.put(reviewCamin.getFacilities().getSex(), sexMap.getOrDefault(reviewCamin.getFacilities().getSex(), 0) + 1);
            pricePerMonthMap.put(reviewCamin.getFacilities().getPricePerMonth(), pricePerMonthMap.getOrDefault(reviewCamin.getFacilities().getPricePerMonth(), 0) + 1);
            if(pricePerMonthMap.get(reviewCamin.getFacilities().getPricePerMonth()) > mostUsedPricePerMonthUses) {
                mostUsedPricePerMonthUses = pricePerMonthMap.get(reviewCamin.getFacilities().getPricePerMonth());
                mostUsedPricePerMonth = reviewCamin.getFacilities().getPricePerMonth();
            }
            peoplePerRoomMap.put(reviewCamin.getFacilities().getPeoplePerRoom(), peoplePerRoomMap.getOrDefault(reviewCamin.getFacilities().getPeoplePerRoom(), 0) + 1);
            if(peoplePerRoomMap.get(reviewCamin.getFacilities().getPeoplePerRoom()) > mostUsedPeoplePerRoomUses) {
                mostUsedPeoplePerRoomUses = peoplePerRoomMap.get(reviewCamin.getFacilities().getPeoplePerRoom());
                mostUsedPeoplePerRoom = reviewCamin.getFacilities().getPeoplePerRoom();
            }
        }

        return (new CaminWithMedianReviews(
                foundCamin.getId(),
                foundCamin.getName(),
                foundCamin.getCity(),
                foundCamin.getOwner(),
                foundCamin.getLatitude(),
                foundCamin.getLongitude(),
                foundCamin.getReviews().size(),
                starsSum / foundCamin.getReviews().size(),
                parkingTrue * 2 >= foundCamin.getReviews().size() ? true : false,
                elevatorTrue * 2 >= foundCamin.getReviews().size() ? true : false,
                bathTrue * 2 >= foundCamin.getReviews().size() ? true : false,
                kitchenTrue * 2 >= foundCamin.getReviews().size() ? true : false,
                sexMap.getOrDefault("baieti", 0) > sexMap.getOrDefault("fete", 0) ? (sexMap.getOrDefault("baieti", 0) > sexMap.getOrDefault("mixt", 0) ? "baieti" : "mixt") : (sexMap.getOrDefault("fete", 0) > sexMap.getOrDefault("mixt", 0) ? "fete" : "mixt"),
                mostUsedPricePerMonth,
                mostUsedPeoplePerRoom
        ));
    }

    @GetMapping("/getCamine/oras={city}")
    public List<CaminWithMedianReviews> getCamineWithMedianReviewsByCity(@PathVariable String city) {
        final List<Camin> filteredByCity = new ArrayList<>();

        MongoDatabase database = mongoClient.getDatabase("camean");
        MongoCollection<Document> collection = database.getCollection("camine");
        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(
                new Document("$search",
                new Document("text",
                new Document("query", city)
                .append("path", "city")
        ))));
        result.forEach(document -> filteredByCity.add(mongoConverter.read(Camin.class, document)));

        final List<CaminWithMedianReviews> filteredByCityWithMedianReviews = new ArrayList<>();
        for(int i = 0; i < filteredByCity.size(); i ++) {
            float starsSum = 0;
            int parkingTrue = 0, elevatorTrue = 0, bathTrue = 0, kitchenTrue = 0;
            Map<String, Integer> sexMap = new HashMap<>();
            Map<Integer, Integer> pricePerMonthMap = new HashMap<>();
            Map<Integer, Integer> peoplePerRoomMap = new HashMap<>();

            int mostUsedPricePerMonth = 0, mostUsedPricePerMonthUses = 0;
            int mostUsedPeoplePerRoom = 0, mostUsedPeoplePerRoomUses = 0;
            Camin camin = filteredByCity.get(i);
            for(int j = 0; j < camin.getReviews().size(); j ++) {
                Review reviewCamin = camin.getReviews().get(j);

                starsSum += reviewCamin.getStars();
                parkingTrue += reviewCamin.getFacilities().getParking() ? 1 : 0;
                elevatorTrue += reviewCamin.getFacilities().getElevator() ? 1 : 0;
                bathTrue += reviewCamin.getFacilities().getBath() ? 1 : 0;
                kitchenTrue += reviewCamin.getFacilities().getKitchen() ? 1 : 0;
                sexMap.put(reviewCamin.getFacilities().getSex(), sexMap.getOrDefault(reviewCamin.getFacilities().getSex(), 0) + 1);
                pricePerMonthMap.put(reviewCamin.getFacilities().getPricePerMonth(), pricePerMonthMap.getOrDefault(reviewCamin.getFacilities().getPricePerMonth(), 0) + 1);
                if(pricePerMonthMap.get(reviewCamin.getFacilities().getPricePerMonth()) > mostUsedPricePerMonthUses) {
                    mostUsedPricePerMonthUses = pricePerMonthMap.get(reviewCamin.getFacilities().getPricePerMonth());
                    mostUsedPricePerMonth = reviewCamin.getFacilities().getPricePerMonth();
                }
                peoplePerRoomMap.put(reviewCamin.getFacilities().getPeoplePerRoom(), peoplePerRoomMap.getOrDefault(reviewCamin.getFacilities().getPeoplePerRoom(), 0) + 1);
                if(peoplePerRoomMap.get(reviewCamin.getFacilities().getPeoplePerRoom()) > mostUsedPeoplePerRoomUses) {
                    mostUsedPeoplePerRoomUses = peoplePerRoomMap.get(reviewCamin.getFacilities().getPeoplePerRoom());
                    mostUsedPeoplePerRoom = reviewCamin.getFacilities().getPeoplePerRoom();
                }
            }

            filteredByCityWithMedianReviews.add(new CaminWithMedianReviews(
                    camin.getId(),
                    camin.getName(),
                    camin.getCity(),
                    camin.getOwner(),
                    camin.getLatitude(),
                    camin.getLongitude(),
                    camin.getReviews().size(),
                    starsSum / camin.getReviews().size(),
                    parkingTrue * 2 >= camin.getReviews().size() ? true : false,
                    elevatorTrue * 2 >= camin.getReviews().size() ? true : false,
                    bathTrue * 2 >= camin.getReviews().size() ? true : false,
                    kitchenTrue * 2 >= camin.getReviews().size() ? true : false,
                    sexMap.getOrDefault("baieti", 0) > sexMap.getOrDefault("fete", 0) ? (sexMap.getOrDefault("baieti", 0) > sexMap.getOrDefault("mixt", 0) ? "baieti" : "mixt") : (sexMap.getOrDefault("fete", 0) > sexMap.getOrDefault("mixt", 0) ? "fete" : "mixt"),
                    mostUsedPricePerMonth,
                    mostUsedPeoplePerRoom
            ));
        }
        return filteredByCityWithMedianReviews;
    }

    @GetMapping("/getReviews/id={id}")
    public ArrayList<Review> getReviewsById(@PathVariable String id) {
        ObjectId objectId = new ObjectId(id);
        Optional<Camin> optionalCamin = cRepo.findById(objectId);
        Camin foundCamin = optionalCamin.get();
        return foundCamin.getReviews();
    }

    @PostMapping("/postReview")
    public void postReview(@RequestBody ReviewWithId reviewWithId) {
        Optional<Camin> optionalCamin = cRepo.findById(reviewWithId.getCaminId());
        if(optionalCamin.isPresent()) {
            Camin updatedCamin = optionalCamin.get();
            Review review = new Review(reviewWithId.getAuthor(), reviewWithId.getStars(), reviewWithId.getText(), reviewWithId.getDate(), reviewWithId.getFacilities());
            updatedCamin.addReview(review);
            cRepo.save(updatedCamin);
        }
    }
}


