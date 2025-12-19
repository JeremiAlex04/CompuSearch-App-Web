package com.simulacion.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class TestController {
    
    @GetMapping
    public ResponseEntity<String> probandoConexion(){
        return ResponseEntity.ok("Hola Mundo!");
    }
}
