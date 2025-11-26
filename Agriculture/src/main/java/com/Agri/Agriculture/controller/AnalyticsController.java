package com.Agri.Agriculture.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @GetMapping("/yield")
    public Map<String, Object> yieldPrediction(@RequestParam(required = false) Long farmId,
                                               @RequestParam(required = false) String cropType) {
        // generate sensor data (7 days) and compute average temp/moisture
        int avgTemp = 22;
        int avgMoisture = 40;
        if (farmId != null) {
            int tSum = 0;
            int mSum = 0;
            for (int i = 6; i >= 0; i--) {
                int moisture = (int) (Math.random() * 40) + 20;
                int temp = (int) (Math.random() * 15) + 18;
                tSum += temp;
                mSum += moisture;
            }
            avgTemp = tSum / 7;
            avgMoisture = mSum / 7;
        }

        String crop = cropType == null ? "Generic" : cropType;
        String predicted = calculateYieldPrediction(crop, avgTemp, avgMoisture);

        Map<String, Object> resp = new HashMap<>();
        resp.put("crop", crop);
        resp.put("avgTemp", avgTemp);
        resp.put("avgMoisture", avgMoisture);
        resp.put("predicted", predicted);
        return resp;
    }

    private String calculateYieldPrediction(String cropType, int avgTemp, int avgMoisture) {
        Map<String, Double> baseYields = Map.of(
                "Sugarcane", 70.0,
                "Ragi", 2.5,
                "Rice", 4.5,
                "Cotton", 2.0,
                "Groundnut", 2.8
        );
        double base = baseYields.getOrDefault(cropType, 3.0);
        double tempFactor = avgTemp > 25 ? 0.9 : 1.0;
        double moistureFactor = avgMoisture < 30 ? 0.85 : avgMoisture > 50 ? 1.1 : 1.0;
        double result = base * tempFactor * moistureFactor;
        return String.format("%.2f", result);
    }
}
