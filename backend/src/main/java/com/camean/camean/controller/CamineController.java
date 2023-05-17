package com.camean.camean.controller;

import com.camean.camean.controller.repository.CamineRepository;
import com.camean.camean.model.Camin;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class CamineController {

    @Autowired
    MongoClient mongoClient;

    @Autowired
    MongoConverter mongoConverter;

    @Autowired
    CamineRepository cRepo;

    @GetMapping("/camine/getAll")
    public List<Camin> getAllCamine() {
        return cRepo.findAll();
    }

    @GetMapping("/camine/{city}")
    public List<Camin> searchCamineByCity(@PathVariable String city) {
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

        return filteredByCity;
    }

    @PostMapping("/camine/post")
    public Camin addCamin(@RequestBody Camin camin) {
        return cRepo.save(camin);
    }
}


