package com.simulacion.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.simulacion.api.model.Tienda;

@Repository
public interface TiendaRepository extends JpaRepository<Tienda, Long>{
    
    Optional<Tienda> findByDireccionApi(String direccionApi);
}
