package com.example.demo.house;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface houseRepo extends JpaRepository<house,Long> {
   house findByName(String name);
   List<house> findAll();
}
