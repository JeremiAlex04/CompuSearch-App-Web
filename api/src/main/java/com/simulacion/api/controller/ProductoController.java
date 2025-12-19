package com.simulacion.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.simulacion.api.dto.ProductoResponse;
import com.simulacion.api.service.ProductoService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/producto")
public class ProductoController {
    
    private final ProductoService productoService;

    @GetMapping
    public ResponseEntity<List<ProductoResponse>> obtenerTodosPorDireccionApi(@RequestParam String direccion){
        List<ProductoResponse> productos = productoService.obtenerTodosPorDireccionApi(direccion);
        return ResponseEntity.ok(productos);
    }
}
