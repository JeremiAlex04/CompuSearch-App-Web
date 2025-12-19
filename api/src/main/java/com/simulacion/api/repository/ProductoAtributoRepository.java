package com.simulacion.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simulacion.api.model.ProductoAtributo;

public interface ProductoAtributoRepository extends JpaRepository<ProductoAtributo, Long>{
    
}
