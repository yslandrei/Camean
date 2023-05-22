package com.camean.camean.controller.repository;

import com.camean.camean.model.Camin;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CamineRepository extends MongoRepository<Camin, ObjectId> {

}
