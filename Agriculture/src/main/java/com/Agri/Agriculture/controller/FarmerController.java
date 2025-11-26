package com.Agri.Agriculture.controller;

import com.Agri.Agriculture.model.Farmer;
import com.Agri.Agriculture.repository.FarmerRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/farmers")
public class FarmerController {

    private final FarmerRepository farmerRepository;

    public FarmerController(FarmerRepository farmerRepository) {
        this.farmerRepository = farmerRepository;
    }

    @GetMapping
    public List<Farmer> list() {
        return farmerRepository.findAll();
    }

    @GetMapping("/{id}")
    public Farmer get(@PathVariable Long id) {
        return farmerRepository.findById(id).orElse(null);
    }
}
