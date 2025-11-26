package com.Agri.Agriculture.controller;

import com.Agri.Agriculture.model.Farm;
import com.Agri.Agriculture.repository.FarmRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/farms")
public class FarmController {

    private final FarmRepository farmRepository;

    public FarmController(FarmRepository farmRepository) {
        this.farmRepository = farmRepository;
    }

    @GetMapping
    public List<Farm> list() {
        return farmRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Farm> create(@RequestBody Farm farm) {
        Farm saved = farmRepository.save(farm);
        return ResponseEntity.ok(saved);
    }
}
