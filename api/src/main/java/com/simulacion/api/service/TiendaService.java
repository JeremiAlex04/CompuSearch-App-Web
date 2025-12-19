package com.simulacion.api.service;

import org.springframework.stereotype.Service;

import com.simulacion.api.model.Tienda;
import com.simulacion.api.repository.TiendaRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class TiendaService {

    private final TiendaRepository tiendaRepository;

    public Tienda obtenerPorDireccionApi(String direccionApi) {
        return tiendaRepository.findByDireccionApi(direccionApi)
                .orElseThrow(
                        () -> new RuntimeException("URL no encontrada en la base de datos"));
    }

}
