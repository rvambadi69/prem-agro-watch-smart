package com.Agri.Agriculture.model;

import jakarta.persistence.*;

@Entity
public class Farm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long farmerId;

    private String name;

    private String cropType;

    private Integer area;

    public Farm() {}

    public Farm(Long farmerId, String name, String cropType, Integer area) {
        this.farmerId = farmerId;
        this.name = name;
        this.cropType = cropType;
        this.area = area;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getFarmerId() { return farmerId; }
    public void setFarmerId(Long farmerId) { this.farmerId = farmerId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCropType() { return cropType; }
    public void setCropType(String cropType) { this.cropType = cropType; }
    public Integer getArea() { return area; }
    public void setArea(Integer area) { this.area = area; }
}
