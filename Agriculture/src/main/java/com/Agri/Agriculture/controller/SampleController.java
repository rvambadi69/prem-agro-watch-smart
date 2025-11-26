package com.Agri.Agriculture.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SampleController {

    @GetMapping("/farms")
    public List<Map<String, Object>> farms() {
        return List.of(
            Map.of("id", 1, "farmerId", 1, "name", "Mysuru Fields", "cropType", "Sugarcane", "area", 50),
            Map.of("id", 2, "farmerId", 1, "name", "Hassan Valley", "cropType", "Ragi", "area", 75),
            Map.of("id", 3, "farmerId", 1, "name", "Tumkur Plains", "cropType", "Rice", "area", 60)
        );
    }
}
