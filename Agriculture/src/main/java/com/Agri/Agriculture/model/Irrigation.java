package com.Agri.Agriculture.model;

import jakarta.persistence.*;

@Entity
public class Irrigation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long farmId;

    private String startTime;

    private Integer duration; // minutes

    private String status;

    public Irrigation() {}

    public Irrigation(Long farmId, String startTime, Integer duration, String status) {
        this.farmId = farmId;
        this.startTime = startTime;
        this.duration = duration;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getFarmId() { return farmId; }
    public void setFarmId(Long farmId) { this.farmId = farmId; }
    public String getStartTime() { return startTime; }
    public void setStartTime(String startTime) { this.startTime = startTime; }
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
