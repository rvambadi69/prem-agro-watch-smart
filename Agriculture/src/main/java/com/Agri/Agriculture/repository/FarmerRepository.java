package com.Agri.Agriculture.repository;

import com.Agri.Agriculture.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmerRepository extends JpaRepository<Farmer, Long> {
}
