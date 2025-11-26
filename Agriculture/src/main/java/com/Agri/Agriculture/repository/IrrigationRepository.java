package com.Agri.Agriculture.repository;

import com.Agri.Agriculture.model.Irrigation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IrrigationRepository extends JpaRepository<Irrigation, Long> {
}
