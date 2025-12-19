package com.simulacion.api.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ProductoResponse {
    private String nombre;
    private String marca;
    private String modelo;
    private String descripcion;
    private String categoria;
    private List<ProductoAtributoResponse> atributos;

    private long id;
    private BigDecimal precio;
    private int stock;
    private String urlProducto;
    private String urlImagen;
}
