package com.simulacion.api.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simulacion.api.model.Atributo;


public interface AtributoRepository extends JpaRepository<Atributo, Long>{
    Optional<Atributo> findByNombre(String nombre);
}
