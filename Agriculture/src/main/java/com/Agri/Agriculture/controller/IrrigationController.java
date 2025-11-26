package com.Agri.Agriculture.controller;

import com.Agri.Agriculture.model.Irrigation;
import com.Agri.Agriculture.repository.IrrigationRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/irrigations")
public class IrrigationController {

    private final IrrigationRepository irrigationRepository;

    public IrrigationController(IrrigationRepository irrigationRepository) {
        this.irrigationRepository = irrigationRepository;
    }

    @GetMapping
    public List<Irrigation> list() {
        return irrigationRepository.findAll();
    }
}
