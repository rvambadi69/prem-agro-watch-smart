package com.Agri.Agriculture.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/farms")
public class SensorController {

    @GetMapping("/{id}/sensors")
    public List<Map<String, Object>> sensors(@PathVariable Long id) {
        // generate 7 days of sensor data for the requested farm id
        LocalDate now = LocalDate.now();
        List<Map<String, Object>> data = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            LocalDate date = now.minusDays(i);
            Map<String, Object> row = new HashMap<>();
            row.put("id", Math.random());
            row.put("farmId", id);
            row.put("date", date.toString());
            int moisture = (int) (Math.random() * 40) + 20;
            int temp = (int) (Math.random() * 15) + 18;
            row.put("soilMoisture", moisture);
            row.put("temperature", temp);
            data.add(row);
        }
        return data;
    }
}
