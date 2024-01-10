package com.example.demo.house;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/house")
@AllArgsConstructor
public class houseController {
    private  final houseService houseService;
    @PostMapping
    public String upload(@RequestBody house request){
        return houseService.saveHouse(request);
    }
    @GetMapping(path = "/getHouse")
    public house findByName(@RequestParam("name") String name){
        return houseService.getHouse(name);
    }
    @GetMapping(path = "/getHouse/all")
    public List<house> findAll(){
        return houseService.getAllHouse();
    }
}
