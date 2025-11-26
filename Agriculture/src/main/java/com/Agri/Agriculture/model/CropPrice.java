package com.Agri.Agriculture.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class CropPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double price;

    private String unit;

    private Instant updatedAt;

    public CropPrice() {}

    public CropPrice(String name, Double price, String unit, Instant updatedAt) {
        this.name = name;
        this.price = price;
        this.unit = unit;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
