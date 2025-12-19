package com.simulacion.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.simulacion.api.dto.ProductoResponse;
import com.simulacion.api.model.Tienda;
import com.simulacion.api.util.Mapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductoService {

    private final TiendaService tiendaService;

    public List<ProductoResponse> obtenerTodosPorDireccionApi(String direccionApi) {
        Tienda tienda = tiendaService.obtenerPorDireccionApi(direccionApi);
        log.info("Obteniendo todos los productos de la tienda {}", tienda.getNombre());
        return tienda.getProductos()
                .stream()
                .map(Mapper::mapToProductoResponse)
                .toList();
    }
}
