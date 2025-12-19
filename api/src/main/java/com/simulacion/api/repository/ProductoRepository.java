package com.simulacion.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.simulacion.api.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long>{
    
}
