package com.example.demo.house;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class houseService {
    private final houseRepo houseRepo;
    public String saveHouse(house house){
        houseRepo.save(house);
        return "it works";
    }
    public house getHouse(String name){
        return houseRepo.findByName(name);
    }
    public List<house> getAllHouse(){
        return houseRepo.findAll();
    }

}
