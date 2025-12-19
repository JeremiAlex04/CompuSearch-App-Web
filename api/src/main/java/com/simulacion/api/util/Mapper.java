package com.simulacion.api.util;

import java.util.List;
import java.util.stream.Collectors;

import com.simulacion.api.dto.ProductoAtributoResponse;
import com.simulacion.api.dto.ProductoResponse;
import com.simulacion.api.model.Producto;
import com.simulacion.api.model.ProductoAtributo;

public class Mapper {

    public static ProductoResponse mapToProductoResponse(Producto producto) {
        return new ProductoResponse(
                producto.getNombre(),
                producto.getMarca(),
                producto.getModelo(),
                producto.getDescripcion(),
                producto.getCategoria(),

                mapToProductoAtributoResponse(producto.getAtributos()),

                producto.getId(),
                producto.getPrecio(),
                producto.getStock(),
                producto.getUrlProducto(),
                producto.getUrlImagen());
    }

    public static List<ProductoAtributoResponse> mapToProductoAtributoResponse(List<ProductoAtributo> atributos) {
        return atributos.stream()
                .map(a -> new ProductoAtributoResponse(
                        a.getAtributo().getNombre(),
                        a.getValor()))
                .collect(Collectors.toList());
    }
}