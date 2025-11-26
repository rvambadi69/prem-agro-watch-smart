package com.Agri.Agriculture.controller;

import com.Agri.Agriculture.model.CropPrice;
import com.Agri.Agriculture.repository.CropPriceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/crop-prices")
public class CropPriceController {

    private final CropPriceRepository cropPriceRepository;

    public CropPriceController(CropPriceRepository cropPriceRepository) {
        this.cropPriceRepository = cropPriceRepository;
    }

    @GetMapping
    public List<CropPrice> list() {
        return cropPriceRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<CropPrice> createOrUpdate(@RequestBody CropPrice cropPrice) {
        cropPrice.setUpdatedAt(Instant.now());
        CropPrice saved = cropPriceRepository.save(cropPrice);
        return ResponseEntity.ok(saved);
    }
}
