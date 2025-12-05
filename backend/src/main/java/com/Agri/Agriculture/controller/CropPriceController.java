package com.Agri.Agriculture.controller;

import com.Agri.Agriculture.model.CropPrice;
import com.Agri.Agriculture.repository.CropPriceRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/crop-prices")
public class CropPriceController {

    private final CropPriceRepository cropPriceRepository;

    @Value("${app.admin.key:}")
    private String adminKey;

    @PostConstruct
    void ensureAdminKeyPresent() {
        if (adminKey != null) {
            adminKey = adminKey.trim();
        }
        if (adminKey == null || adminKey.isBlank()) {
            throw new IllegalStateException("app.admin.key is not configured; crop price updates are disabled");
        }
    }

    public CropPriceController(CropPriceRepository cropPriceRepository) {
        this.cropPriceRepository = cropPriceRepository;
    }

    @GetMapping
    public List<CropPrice> list() {
        return cropPriceRepository.findAll();
    }

    @GetMapping("/validate")
    public ResponseEntity<Void> validate(@RequestHeader(value = "x-admin-key", required = true) String providedKey) {
        if (providedKey != null) {
            providedKey = providedKey.trim();
        }
        if (!adminKey.equals(providedKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<CropPrice> createOrUpdate(@RequestBody CropPrice cropPrice,
                                                    @RequestHeader(value = "x-admin-key", required = true) String providedKey) {
        if (providedKey != null) {
            providedKey = providedKey.trim();
        }
        if (!adminKey.equals(providedKey)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        cropPrice.setUpdatedAt(Instant.now());
        CropPrice saved = cropPriceRepository.save(cropPrice);
        return ResponseEntity.ok(saved);
    }
}
