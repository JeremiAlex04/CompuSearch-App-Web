import { http, HttpResponse } from 'msw'

// ==========================================
// 1. BASE DE DATOS FICTICIA (Estructura Base)
// ==========================================

const db = {
  builds: [],
  etiquetas: [
    { idEtiqueta: 1, nombre: "Garantía Oficial 1 año" },
    { idEtiqueta: 2, nombre: "Envíos a todo Lima" },
    { idEtiqueta: 3, nombre: "Soporte Local" },
    { idEtiqueta: 4, nombre: "Garantía Retail" },
    { idEtiqueta: 5, nombre: "Importación directa" }
  ],
  usuarios: [
    { id: 1, nombre: "Admin Prueba", username: "AdminPrueba", email: "admin@compusearch.com", rol: "ADMIN", estado: "ACTIVO", tipoUsuario: "EMPLEADO" },
    { id: 2, nombre: "Cliente Prueba", username: "ClientePrueba", email: "cliente@compusearch.com", rol: "CLIENTE", estado: "ACTIVO", tipoUsuario: "USUARIO" },
    { id: 3, nombre: "Soporte Técnico", username: "SoporteTecnico", email: "soporte@compusearch.com", rol: "SOPORTE", estado: "ACTIVO", tipoUsuario: "EMPLEADO" },
    { id: 4, nombre: "Vendedor Wilson", username: "VendedorWilson", email: "ventas@compusearch.com", rol: "VENDEDOR", estado: "ACTIVO", tipoUsuario: "TIENDA" }
  ],
  tiendas: [
    { id: 1, nombre: "CompuSearch Central", direccion: "Av. Principal 123 - San Isidro, Lima", estado: "ACTIVO", telefono: "555-0101", garantia: "Garantía Oficial 1 año / Envíos Lima", etiquetas: [{ idEtiqueta: 1, nombre: "Garantía Oficial 1 año" }, { idEtiqueta: 2, nombre: "Envíos a todo Lima" }], urlPagina: "https://compusearch.com" },
    { id: 2, nombre: "CompuSearch Norte", direccion: "Plaza Mayor 456 - Los Olivos, Lima", estado: "INACTIVO", telefono: "555-0202", garantia: "Soporte Local", etiquetas: [{ idEtiqueta: 3, nombre: "Soporte Local" }], urlPagina: "https://compusearch.com" },
    { id: 3, nombre: "pc Factory Perú", direccion: "Plaza San Miguel / Jockey Plaza / Comas", estado: "ACTIVO", telefono: "+51 1 7161666", garantia: "Garantía Retail / Boleta / Factura / Asesoría", etiquetas: [{ idEtiqueta: 4, nombre: "Garantía Retail" }], urlPagina: "https://www.pcfactory.com.pe" },
    { id: 4, nombre: "Grupo Compu & Visión", direccion: "Av. Garcilaso de la Vega 1251, Tienda #123 (Compuplaza)", estado: "ACTIVO", telefono: "987 163 458", garantia: "Importación directa / Venta componentes", etiquetas: [], urlPagina: "https://compuvision.pe" },
    { id: 5, nombre: "SB Data", direccion: "Av. Garcilaso de la Vega 1236, Tienda 324 (Wilson)", estado: "ACTIVO", telefono: "994 061 341", garantia: "Armado de PC / Cotización por WhatsApp", etiquetas: [], urlPagina: "https://sbdata.com.pe" },
    { id: 6, nombre: "Infotec Perú", direccion: "Grupo Infotec - Tienda Virtual y Física Lima", estado: "ACTIVO", telefono: "935 715 405", garantia: "Distribuidor autorizado Intel y AMD", etiquetas: [], urlPagina: "https://infotec.com.pe" },
    { id: 7, nombre: "Rayotec", direccion: "RUC 20608329839 - Grupo Tecnológico M&V S.A.C.", estado: "ACTIVO", telefono: "974 578 820", garantia: "Acepta MercadoPago / Envíos a provincia", etiquetas: [], urlPagina: "https://rayotec.pe" },
    { id: 8, nombre: "Memory Kings", direccion: "Minorista Mayorista Wilson / Tienda Online", estado: "ACTIVO", telefono: "(01) 619-3000", garantia: "Garantía extendida en componentes", etiquetas: [], urlPagina: "https://memorykings.pe" },
    { id: 9, nombre: "SercoPlus", direccion: "Galería CompuPlaza - Wilson, Lima", estado: "ACTIVO", telefono: "(01) 423-1122", garantia: "Garantía oficial de 1 año en hardware", etiquetas: [], urlPagina: "https://sercoplus.com" }
  ],
      productos: [
    { id: 1000, nombre: "Procesador Intel Core i9-14900K 24-Cores", descripcion: "24 Núcleos (8 Performance + 16 Efficient), 32 Hilos, Frecuencia Turbo hasta 6.0 GHz, 36MB Intel Smart Cache, Socket LGA1700, TDP 125W/253W. Gráficos integrados UHD Intel 770. Compatible con memorias DDR4/DDR5 y PCIe 5.0.", precio: 445, categoria: "Procesador", stock: 10, tienda: "Grupo Compu & Visión", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=Intel+Core+i9-14900K", urlTienda: "https://compusearch.com/productos/101" , detalles: [{ nombreAtributo: "Socket CPU", valor: "LGA1700" }, { nombreAtributo: "Consumo", valor: "125W" }] },
    { id: 1001, nombre: "Procesador Intel Core i9-14900K 24-Cores", descripcion: "24 Núcleos (8 Performance + 16 Efficient), 32 Hilos, Frecuencia Turbo hasta 6.0 GHz, 36MB Intel Smart Cache, Socket LGA1700, TDP 125W/253W. Gráficos integrados UHD Intel 770. Compatible con memorias DDR4/DDR5 y PCIe 5.0.", precio: 450, categoria: "Procesador", stock: 10, tienda: "CompuSearch Central", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=Intel+Core+i9-14900K", urlTienda: "https://compusearch.com/productos/101" , detalles: [{ nombreAtributo: "Socket CPU", valor: "LGA1700" }, { nombreAtributo: "Consumo", valor: "125W" }] },
    { id: 1002, nombre: "Procesador Intel Core i9-14900K 24-Cores", descripcion: "24 Núcleos (8 Performance + 16 Efficient), 32 Hilos, Frecuencia Turbo hasta 6.0 GHz, 36MB Intel Smart Cache, Socket LGA1700, TDP 125W/253W. Gráficos integrados UHD Intel 770. Compatible con memorias DDR4/DDR5 y PCIe 5.0.", precio: 459, categoria: "Procesador", stock: 10, tienda: "Memory Kings", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=Intel+Core+i9-14900K", urlTienda: "https://compusearch.com/productos/101" , detalles: [{ nombreAtributo: "Socket CPU", valor: "LGA1700" }, { nombreAtributo: "Consumo", valor: "125W" }] },
    { id: 1003, nombre: "Procesador Intel Core i9-14900K 24-Cores", descripcion: "24 Núcleos (8 Performance + 16 Efficient), 32 Hilos, Frecuencia Turbo hasta 6.0 GHz, 36MB Intel Smart Cache, Socket LGA1700, TDP 125W/253W. Gráficos integrados UHD Intel 770. Compatible con memorias DDR4/DDR5 y PCIe 5.0.", precio: 465, categoria: "Procesador", stock: 10, tienda: "pc Factory Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=Intel+Core+i9-14900K", urlTienda: "https://compusearch.com/productos/101" , detalles: [{ nombreAtributo: "Socket CPU", valor: "LGA1700" }, { nombreAtributo: "Consumo", valor: "125W" }] },
    { id: 1004, nombre: "Tarjeta Gráfica RTX 4090 24GB GDDR6X", descripcion: "24GB GDDR6X 384-bit, 16384 CUDA Cores, Arquitectura Ada Lovelace, DLSS 3, Ray Tracing 3ra Gen, Boost 2.52 GHz. Requisito de Fuente: 850W+, Conector 16-pin PCIe 5.0.", precio: 1580, categoria: "Tarjeta de Video", stock: 3, tienda: "Grupo Compu & Visión", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/15803d/ffffff/png?text=GeForce+RTX+4090", urlTienda: "https://compusearch.com/productos/102" , detalles: [{ nombreAtributo: "Consumo", valor: "850W" }, { nombreAtributo: "Interfaz PCIe GPU", valor: "PCIe 4.0 x16" }] },
    { id: 1005, nombre: "Tarjeta Gráfica RTX 4090 24GB GDDR6X", descripcion: "24GB GDDR6X 384-bit, 16384 CUDA Cores, Arquitectura Ada Lovelace, DLSS 3, Ray Tracing 3ra Gen, Boost 2.52 GHz. Requisito de Fuente: 850W+, Conector 16-pin PCIe 5.0.", precio: 1590, categoria: "Tarjeta de Video", stock: 3, tienda: "SercoPlus", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/15803d/ffffff/png?text=GeForce+RTX+4090", urlTienda: "https://compusearch.com/productos/102" , detalles: [{ nombreAtributo: "Consumo", valor: "850W" }, { nombreAtributo: "Interfaz PCIe GPU", valor: "PCIe 4.0 x16" }] },
    { id: 1006, nombre: "Tarjeta Gráfica RTX 4090 24GB GDDR6X", descripcion: "24GB GDDR6X 384-bit, 16384 CUDA Cores, Arquitectura Ada Lovelace, DLSS 3, Ray Tracing 3ra Gen, Boost 2.52 GHz. Requisito de Fuente: 850W+, Conector 16-pin PCIe 5.0.", precio: 1599.99, categoria: "Tarjeta de Video", stock: 3, tienda: "CompuSearch Central", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/15803d/ffffff/png?text=GeForce+RTX+4090", urlTienda: "https://compusearch.com/productos/102" , detalles: [{ nombreAtributo: "Consumo", valor: "850W" }, { nombreAtributo: "Interfaz PCIe GPU", valor: "PCIe 4.0 x16" }] },
    { id: 1007, nombre: "Tarjeta Gráfica RTX 4090 24GB GDDR6X", descripcion: "24GB GDDR6X 384-bit, 16384 CUDA Cores, Arquitectura Ada Lovelace, DLSS 3, Ray Tracing 3ra Gen, Boost 2.52 GHz. Requisito de Fuente: 850W+, Conector 16-pin PCIe 5.0.", precio: 1620, categoria: "Tarjeta de Video", stock: 3, tienda: "pc Factory Perú", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/15803d/ffffff/png?text=GeForce+RTX+4090", urlTienda: "https://compusearch.com/productos/102" , detalles: [{ nombreAtributo: "Consumo", valor: "850W" }, { nombreAtributo: "Interfaz PCIe GPU", valor: "PCIe 4.0 x16" }] },
    { id: 1008, nombre: "Memoria RAM 32GB (2x16GB) DDR5 6000MHz", descripcion: "Kit 32GB (2x16GB), Velocidad 6000MHz, Latencia CL36 (1.35V), Soporte Intel XMP 3.0 / AMD EXPO, Disipador de Aluminio Anodizado Negro, Formato UDIMM 288-pin.", precio: 120.5, categoria: "Memoria RAM", stock: 25, tienda: "CompuSearch Norte", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/b45309/ffffff/png?text=DDR5+RAM", urlTienda: "https://compusearch.com/productos/103" , detalles: [] },
    { id: 1009, nombre: "Memoria RAM 32GB (2x16GB) DDR5 6000MHz", descripcion: "Kit 32GB (2x16GB), Velocidad 6000MHz, Latencia CL36 (1.35V), Soporte Intel XMP 3.0 / AMD EXPO, Disipador de Aluminio Anodizado Negro, Formato UDIMM 288-pin.", precio: 125, categoria: "Memoria RAM", stock: 25, tienda: "SB Data Wilson", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/b45309/ffffff/png?text=DDR5+RAM", urlTienda: "https://compusearch.com/productos/103" , detalles: [] },
    { id: 1010, nombre: "Memoria RAM 32GB (2x16GB) DDR5 6000MHz", descripcion: "Kit 32GB (2x16GB), Velocidad 6000MHz, Latencia CL36 (1.35V), Soporte Intel XMP 3.0 / AMD EXPO, Disipador de Aluminio Anodizado Negro, Formato UDIMM 288-pin.", precio: 128, categoria: "Memoria RAM", stock: 25, tienda: "Infotec Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/b45309/ffffff/png?text=DDR5+RAM", urlTienda: "https://compusearch.com/productos/103" , detalles: [] },
    { id: 1011, nombre: "Memoria RAM 32GB (2x16GB) DDR5 6000MHz", descripcion: "Kit 32GB (2x16GB), Velocidad 6000MHz, Latencia CL36 (1.35V), Soporte Intel XMP 3.0 / AMD EXPO, Disipador de Aluminio Anodizado Negro, Formato UDIMM 288-pin.", precio: 135, categoria: "Memoria RAM", stock: 25, tienda: "Grupo Compu & Visión", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/b45309/ffffff/png?text=DDR5+RAM", urlTienda: "https://compusearch.com/productos/103" , detalles: [] },
    { id: 1012, nombre: "Procesador Intel Core i5-12400F 6 Núcleos", descripcion: "6 Núcleos (6P), 12 Hilos, Frecuencia Turbo 4.4 GHz, 18MB Cache, Socket LGA1700, TDP 65W, Sin gráficos integrados (requiere GPU). Incluye Cooler Intel Laminar RM1.", precio: 180, categoria: "Procesador", stock: 30, tienda: "SB Data Wilson", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=Intel+Core+i5-12400F", urlTienda: "https://www.pcfactory.com.pe/producto/45231" , detalles: [{ nombreAtributo: "Socket CPU", valor: "LGA1700" }, { nombreAtributo: "Consumo", valor: "65W" }] },
    { id: 1013, nombre: "Procesador Intel Core i5-12400F 6 Núcleos", descripcion: "6 Núcleos (6P), 12 Hilos, Frecuencia Turbo 4.4 GHz, 18MB Cache, Socket LGA1700, TDP 65W, Sin gráficos integrados (requiere GPU). Incluye Cooler Intel Laminar RM1.", precio: 182.5, categoria: "Procesador", stock: 30, tienda: "Infotec Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=Intel+Core+i5-12400F", urlTienda: "https://www.pcfactory.com.pe/producto/45231" , detalles: [{ nombreAtributo: "Socket CPU", valor: "LGA1700" }, { nombreAtributo: "Consumo", valor: "65W" }] },
    { id: 1014, nombre: "Procesador Intel Core i5-12400F 6 Núcleos", descripcion: "6 Núcleos (6P), 12 Hilos, Frecuencia Turbo 4.4 GHz, 18MB Cache, Socket LGA1700, TDP 65W, Sin gráficos integrados (requiere GPU). Incluye Cooler Intel Laminar RM1.", precio: 183.75, categoria: "Procesador", stock: 30, tienda: "pc Factory Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=Intel+Core+i5-12400F", urlTienda: "https://www.pcfactory.com.pe/producto/45231" , detalles: [{ nombreAtributo: "Socket CPU", valor: "LGA1700" }, { nombreAtributo: "Consumo", valor: "65W" }] },
    { id: 1015, nombre: "Procesador Intel Core i5-12400F 6 Núcleos", descripcion: "6 Núcleos (6P), 12 Hilos, Frecuencia Turbo 4.4 GHz, 18MB Cache, Socket LGA1700, TDP 65W, Sin gráficos integrados (requiere GPU). Incluye Cooler Intel Laminar RM1.", precio: 185, categoria: "Procesador", stock: 30, tienda: "Rayotec", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=Intel+Core+i5-12400F", urlTienda: "https://www.pcfactory.com.pe/producto/45231" , detalles: [{ nombreAtributo: "Socket CPU", valor: "LGA1700" }, { nombreAtributo: "Consumo", valor: "65W" }] },
    { id: 1016, nombre: "Procesador AMD Ryzen 5 5500 6 Cuerpos 4.2GHz", descripcion: "6 Núcleos, 12 Hilos, Frecuencia Base 3.6 GHz / Boost 4.2 GHz, 19MB Cache, Socket AM4, TDP 65W, Arquitectura Zen 3. Incluye Cooler Wraith Stealth.", precio: 105, categoria: "Procesador", stock: 17, tienda: "Infotec Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=AMD+Ryzen+5+5500", urlTienda: "https://www.pcfactory.com.pe/producto/46112" , detalles: [{ nombreAtributo: "Socket CPU", valor: "AM4" }, { nombreAtributo: "Consumo", valor: "65W" }] },
    { id: 1017, nombre: "Procesador AMD Ryzen 5 5500 6 Cuerpos 4.2GHz", descripcion: "6 Núcleos, 12 Hilos, Frecuencia Base 3.6 GHz / Boost 4.2 GHz, 19MB Cache, Socket AM4, TDP 65W, Arquitectura Zen 3. Incluye Cooler Wraith Stealth.", precio: 107.5, categoria: "Procesador", stock: 17, tienda: "SercoPlus", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=AMD+Ryzen+5+5500", urlTienda: "https://www.pcfactory.com.pe/producto/46112" , detalles: [{ nombreAtributo: "Socket CPU", valor: "AM4" }, { nombreAtributo: "Consumo", valor: "65W" }] },
    { id: 1018, nombre: "Procesador AMD Ryzen 5 5500 6 Cuerpos 4.2GHz", descripcion: "6 Núcleos, 12 Hilos, Frecuencia Base 3.6 GHz / Boost 4.2 GHz, 19MB Cache, Socket AM4, TDP 65W, Arquitectura Zen 3. Incluye Cooler Wraith Stealth.", precio: 108, categoria: "Procesador", stock: 17, tienda: "pc Factory Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=AMD+Ryzen+5+5500", urlTienda: "https://www.pcfactory.com.pe/producto/46112" , detalles: [{ nombreAtributo: "Socket CPU", valor: "AM4" }, { nombreAtributo: "Consumo", valor: "65W" }] },
    { id: 1019, nombre: "Procesador AMD Ryzen 7 5700G 8 Cuerpos 4.6GHz", descripcion: "8 Núcleos, 16 Hilos, Frecuencia Base 3.8 GHz / Boost 4.6 GHz, Gráficos Integrados Radeon Vega 8 (2000 MHz), Socket AM4, 20MB Cache, TDP 65W. Incluye Cooler Wraith Stealth.", precio: 220, categoria: "Procesador", stock: 11, tienda: "Memory Kings", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=AMD+Ryzen+7+5700G", urlTienda: "https://www.pcfactory.com.pe/producto/43009" , detalles: [{ nombreAtributo: "Socket CPU", valor: "AM4" }, { nombreAtributo: "Consumo", valor: "65W" }] },
    { id: 1020, nombre: "Procesador AMD Ryzen 7 5700G 8 Cuerpos 4.6GHz", descripcion: "8 Núcleos, 16 Hilos, Frecuencia Base 3.8 GHz / Boost 4.6 GHz, Gráficos Integrados Radeon Vega 8 (2000 MHz), Socket AM4, 20MB Cache, TDP 65W. Incluye Cooler Wraith Stealth.", precio: 222, categoria: "Procesador", stock: 11, tienda: "Grupo Compu & Visión", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=AMD+Ryzen+7+5700G", urlTienda: "https://www.pcfactory.com.pe/producto/43009" , detalles: [{ nombreAtributo: "Socket CPU", valor: "AM4" }, { nombreAtributo: "Consumo", valor: "65W" }] },
    { id: 1021, nombre: "Procesador AMD Ryzen 7 5700G 8 Cuerpos 4.6GHz", descripcion: "8 Núcleos, 16 Hilos, Frecuencia Base 3.8 GHz / Boost 4.6 GHz, Gráficos Integrados Radeon Vega 8 (2000 MHz), Socket AM4, 20MB Cache, TDP 65W. Incluye Cooler Wraith Stealth.", precio: 224.25, categoria: "Procesador", stock: 11, tienda: "pc Factory Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=AMD+Ryzen+7+5700G", urlTienda: "https://www.pcfactory.com.pe/producto/43009" , detalles: [{ nombreAtributo: "Socket CPU", valor: "AM4" }, { nombreAtributo: "Consumo", valor: "65W" }] },
    { id: 1022, nombre: "Procesador Intel Core i7-12700 12 Cuerpos 4.9GHz", descripcion: "12 Núcleos (8P + 4E), 20 Hilos, Frecuencia Turbo 4.9 GHz, 25MB Cache, Socket LGA1700, Gráficos UHD 770, TDP 65W/180W.", precio: 399, categoria: "Procesador", stock: 12, tienda: "CompuSearch Central", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=Intel+Core+i7-12700", urlTienda: "https://www.pcfactory.com.pe/producto/45001" , detalles: [{ nombreAtributo: "Socket CPU", valor: "LGA1700" }, { nombreAtributo: "Consumo", valor: "65W" }] },
    { id: 1023, nombre: "Procesador Intel Core i7-12700 12 Cuerpos 4.9GHz", descripcion: "12 Núcleos (8P + 4E), 20 Hilos, Frecuencia Turbo 4.9 GHz, 25MB Cache, Socket LGA1700, Gráficos UHD 770, TDP 65W/180W.", precio: 402, categoria: "Procesador", stock: 12, tienda: "SB Data Wilson", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=Intel+Core+i7-12700", urlTienda: "https://www.pcfactory.com.pe/producto/45001" , detalles: [{ nombreAtributo: "Socket CPU", valor: "LGA1700" }, { nombreAtributo: "Consumo", valor: "65W" }] },
    { id: 1024, nombre: "Procesador Intel Core i7-12700 12 Cuerpos 4.9GHz", descripcion: "12 Núcleos (8P + 4E), 20 Hilos, Frecuencia Turbo 4.9 GHz, 25MB Cache, Socket LGA1700, Gráficos UHD 770, TDP 65W/180W.", precio: 405.35, categoria: "Procesador", stock: 12, tienda: "pc Factory Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=Intel+Core+i7-12700", urlTienda: "https://www.pcfactory.com.pe/producto/45001" , detalles: [{ nombreAtributo: "Socket CPU", valor: "LGA1700" }, { nombreAtributo: "Consumo", valor: "65W" }] },
    { id: 1025, nombre: "Procesador AMD Ryzen 5 7600X AM5 5.3GHz", descripcion: "6 Núcleos, 12 Hilos, Frecuencia Base 4.7 GHz / Boost 5.3 GHz, Arquitectura Zen 4 (5nm), Socket AM5, 38MB Cache, TDP 105W. Requiere memorias DDR5.", precio: 248, categoria: "Procesador", stock: 6, tienda: "Grupo Compu & Visión", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=AMD+Ryzen+5+7600X", urlTienda: "https://www.pcfactory.com.pe/producto/47802" , detalles: [{ nombreAtributo: "Socket CPU", valor: "AM5" }, { nombreAtributo: "Consumo", valor: "105W" }] },
    { id: 1026, nombre: "Procesador AMD Ryzen 5 7600X AM5 5.3GHz", descripcion: "6 Núcleos, 12 Hilos, Frecuencia Base 4.7 GHz / Boost 5.3 GHz, Arquitectura Zen 4 (5nm), Socket AM5, 38MB Cache, TDP 105W. Requiere memorias DDR5.", precio: 250, categoria: "Procesador", stock: 6, tienda: "Memory Kings", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=AMD+Ryzen+5+7600X", urlTienda: "https://www.pcfactory.com.pe/producto/47802" , detalles: [{ nombreAtributo: "Socket CPU", valor: "AM5" }, { nombreAtributo: "Consumo", valor: "105W" }] },
    { id: 1027, nombre: "Procesador AMD Ryzen 5 7600X AM5 5.3GHz", descripcion: "6 Núcleos, 12 Hilos, Frecuencia Base 4.7 GHz / Boost 5.3 GHz, Arquitectura Zen 4 (5nm), Socket AM5, 38MB Cache, TDP 105W. Requiere memorias DDR5.", precio: 251.3, categoria: "Procesador", stock: 6, tienda: "pc Factory Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/1d4ed8/ffffff/png?text=AMD+Ryzen+5+7600X", urlTienda: "https://www.pcfactory.com.pe/producto/47802" , detalles: [{ nombreAtributo: "Socket CPU", valor: "AM5" }, { nombreAtributo: "Consumo", valor: "105W" }] },
    { id: 1028, nombre: "Tarjeta de Video GeForce RTX 3050 6GB MSI Ventus 2X", descripcion: "6GB GDDR6 96-bit, 2304 CUDA Cores, Dual Fan, PCI Express 4.0, Salidas 2x DP / 2x HDMI, TDP 75W (Sin cable de alimentación adicional).", precio: 265, categoria: "Tarjeta de Video", stock: 23, tienda: "SB Data Wilson", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/15803d/ffffff/png?text=GeForce+RTX+3050", urlTienda: "https://www.pcfactory.com.pe/producto/49102" , detalles: [{ nombreAtributo: "Consumo", valor: "75W" }, { nombreAtributo: "Interfaz PCIe GPU", valor: "PCIe 4.0 x16" }] },
    { id: 1029, nombre: "Tarjeta de Video GeForce RTX 3050 6GB MSI Ventus 2X", descripcion: "6GB GDDR6 96-bit, 2304 CUDA Cores, Dual Fan, PCI Express 4.0, Salidas 2x DP / 2x HDMI, TDP 75W (Sin cable de alimentación adicional).", precio: 268, categoria: "Tarjeta de Video", stock: 23, tienda: "Rayotec", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/15803d/ffffff/png?text=GeForce+RTX+3050", urlTienda: "https://www.pcfactory.com.pe/producto/49102" , detalles: [{ nombreAtributo: "Consumo", valor: "75W" }, { nombreAtributo: "Interfaz PCIe GPU", valor: "PCIe 4.0 x16" }] },
    { id: 1030, nombre: "Tarjeta de Video GeForce RTX 3050 6GB MSI Ventus 2X", descripcion: "6GB GDDR6 96-bit, 2304 CUDA Cores, Dual Fan, PCI Express 4.0, Salidas 2x DP / 2x HDMI, TDP 75W (Sin cable de alimentación adicional).", precio: 270.2, categoria: "Tarjeta de Video", stock: 23, tienda: "pc Factory Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/15803d/ffffff/png?text=GeForce+RTX+3050", urlTienda: "https://www.pcfactory.com.pe/producto/49102" , detalles: [{ nombreAtributo: "Consumo", valor: "75W" }, { nombreAtributo: "Interfaz PCIe GPU", valor: "PCIe 4.0 x16" }] },
    { id: 1031, nombre: "Tarjeta de Video GeForce RTX 4060 8GB MSI Shadow 2X", descripcion: "8GB GDDR6 128-bit, 3072 CUDA Cores, DLSS 3, Boost 2460 MHz, Requisito de Fuente: 550W+, Conector 1x 8-pin, Salidas 3x DP 1.4a / 1x HDMI 2.1a.", precio: 449, categoria: "Tarjeta de Video", stock: 8, tienda: "Grupo Compu & Visión", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/15803d/ffffff/png?text=GeForce+RTX+4060", urlTienda: "https://www.pcfactory.com.pe/producto/50123" , detalles: [{ nombreAtributo: "Consumo", valor: "550W" }, { nombreAtributo: "Interfaz PCIe GPU", valor: "PCIe 4.0 x16" }] },
    { id: 1032, nombre: "Tarjeta de Video GeForce RTX 4060 8GB MSI Shadow 2X", descripcion: "8GB GDDR6 128-bit, 3072 CUDA Cores, DLSS 3, Boost 2460 MHz, Requisito de Fuente: 550W+, Conector 1x 8-pin, Salidas 3x DP 1.4a / 1x HDMI 2.1a.", precio: 452, categoria: "Tarjeta de Video", stock: 8, tienda: "SercoPlus", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/15803d/ffffff/png?text=GeForce+RTX+4060", urlTienda: "https://www.pcfactory.com.pe/producto/50123" , detalles: [{ nombreAtributo: "Consumo", valor: "550W" }, { nombreAtributo: "Interfaz PCIe GPU", valor: "PCIe 4.0 x16" }] },
    { id: 1033, nombre: "Tarjeta de Video GeForce RTX 4060 8GB MSI Shadow 2X", descripcion: "8GB GDDR6 128-bit, 3072 CUDA Cores, DLSS 3, Boost 2460 MHz, Requisito de Fuente: 550W+, Conector 1x 8-pin, Salidas 3x DP 1.4a / 1x HDMI 2.1a.", precio: 459.4, categoria: "Tarjeta de Video", stock: 8, tienda: "pc Factory Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/15803d/ffffff/png?text=GeForce+RTX+4060", urlTienda: "https://www.pcfactory.com.pe/producto/50123" , detalles: [{ nombreAtributo: "Consumo", valor: "550W" }, { nombreAtributo: "Interfaz PCIe GPU", valor: "PCIe 4.0 x16" }] },
    { id: 1034, nombre: "Tarjeta de Video GeForce RTX 4070 12GB Asus Prime OC", descripcion: "12GB GDDR6X 192-bit, 5888 CUDA Cores, DLSS 3.5, Boost 2550 MHz, Triple Fan Axial-tech, Placa trasera de aluminio, Requisito Fuente 650W.", precio: 1040, categoria: "Tarjeta de Video", stock: 4, tienda: "CompuSearch Central", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/15803d/ffffff/png?text=GeForce+RTX+4070", urlTienda: "https://www.pcfactory.com.pe/producto/51004" , detalles: [{ nombreAtributo: "Consumo", valor: "650W" }, { nombreAtributo: "Interfaz PCIe GPU", valor: "PCIe 4.0 x16" }] },
    { id: 1035, nombre: "Tarjeta de Video GeForce RTX 4070 12GB Asus Prime OC", descripcion: "12GB GDDR6X 192-bit, 5888 CUDA Cores, DLSS 3.5, Boost 2550 MHz, Triple Fan Axial-tech, Placa trasera de aluminio, Requisito Fuente 650W.", precio: 1049, categoria: "Tarjeta de Video", stock: 4, tienda: "Memory Kings", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/15803d/ffffff/png?text=GeForce+RTX+4070", urlTienda: "https://www.pcfactory.com.pe/producto/51004" , detalles: [{ nombreAtributo: "Consumo", valor: "650W" }, { nombreAtributo: "Interfaz PCIe GPU", valor: "PCIe 4.0 x16" }] },
    { id: 1036, nombre: "Tarjeta de Video GeForce RTX 4070 12GB Asus Prime OC", descripcion: "12GB GDDR6X 192-bit, 5888 CUDA Cores, DLSS 3.5, Boost 2550 MHz, Triple Fan Axial-tech, Placa trasera de aluminio, Requisito Fuente 650W.", precio: 1054, categoria: "Tarjeta de Video", stock: 4, tienda: "pc Factory Perú", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/15803d/ffffff/png?text=GeForce+RTX+4070", urlTienda: "https://www.pcfactory.com.pe/producto/51004" , detalles: [{ nombreAtributo: "Consumo", valor: "650W" }, { nombreAtributo: "Interfaz PCIe GPU", valor: "PCIe 4.0 x16" }] },
    { id: 1037, nombre: "Placa MSI MAG X870E GAMING MAX WIFI AM5 DDR5", descripcion: "Socket AM5 para Ryzen 7000/8000/9000, Chipset X870E, 4x DDR5 hasta 8000+ MHz OC, 4x M.2 NVMe (PCIe 5.0), Wi-Fi 7 + LAN 5G, VRM 18+2+1 Fases.", precio: 299, categoria: "Placa Madre", stock: 2, tienda: "Grupo Compu & Visión", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/7e22ce/ffffff/png?text=MSI+MAG+X870E", urlTienda: "https://compuvision.pe/producto/112" , detalles: [{ nombreAtributo: "Socket Motherboard", valor: "AM5" }, { nombreAtributo: "Tipo RAM Compatible", valor: "DDR5" }, { nombreAtributo: "Puertos M.2", valor: "2" }] },
    { id: 1038, nombre: "Placa MSI MAG X870E GAMING MAX WIFI AM5 DDR5", descripcion: "Socket AM5 para Ryzen 7000/8000/9000, Chipset X870E, 4x DDR5 hasta 8000+ MHz OC, 4x M.2 NVMe (PCIe 5.0), Wi-Fi 7 + LAN 5G, VRM 18+2+1 Fases.", precio: 305, categoria: "Placa Madre", stock: 2, tienda: "SB Data Wilson", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/7e22ce/ffffff/png?text=MSI+MAG+X870E", urlTienda: "https://compuvision.pe/producto/112" , detalles: [{ nombreAtributo: "Socket Motherboard", valor: "AM5" }, { nombreAtributo: "Tipo RAM Compatible", valor: "DDR5" }, { nombreAtributo: "Puertos M.2", valor: "2" }] },
    { id: 1039, nombre: "Placa MSI MAG X870E GAMING MAX WIFI AM5 DDR5", descripcion: "Socket AM5 para Ryzen 7000/8000/9000, Chipset X870E, 4x DDR5 hasta 8000+ MHz OC, 4x M.2 NVMe (PCIe 5.0), Wi-Fi 7 + LAN 5G, VRM 18+2+1 Fases.", precio: 310, categoria: "Placa Madre", stock: 2, tienda: "pc Factory Perú", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/7e22ce/ffffff/png?text=MSI+MAG+X870E", urlTienda: "https://compuvision.pe/producto/112" , detalles: [{ nombreAtributo: "Socket Motherboard", valor: "AM5" }, { nombreAtributo: "Tipo RAM Compatible", valor: "DDR5" }, { nombreAtributo: "Puertos M.2", valor: "2" }] },
    { id: 1040, nombre: "Tarjeta de Video RTX 4050 8GB Gigabyte Windforce OC", descripcion: "8GB GDDR6 128-bit, Dual Fan Windforce 2X, DLSS 3, Boost 2475 MHz, Placa de protección trasera.", precio: 365, categoria: "Tarjeta de Video", stock: 10, tienda: "Grupo Compu & Visión", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/15803d/ffffff/png?text=GeForce+RTX+4050", urlTienda: "https://compuvision.pe/producto/113" , detalles: [{ nombreAtributo: "Interfaz PCIe GPU", valor: "PCIe 4.0 x16" }] },
    { id: 1041, nombre: "Tarjeta de Video RTX 4050 8GB Gigabyte Windforce OC", descripcion: "8GB GDDR6 128-bit, Dual Fan Windforce 2X, DLSS 3, Boost 2475 MHz, Placa de protección trasera.", precio: 369, categoria: "Tarjeta de Video", stock: 10, tienda: "Rayotec", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/15803d/ffffff/png?text=GeForce+RTX+4050", urlTienda: "https://compuvision.pe/producto/113" , detalles: [{ nombreAtributo: "Interfaz PCIe GPU", valor: "PCIe 4.0 x16" }] },
    { id: 1042, nombre: "Placa Gigabyte B860M K Gen5 LGA 1851 DDR5", descripcion: "Socket LGA1851 para procesadores Intel Core Ultra, Chipset B860, 2x DDR5, PCIe 5.0 x16, M.2 NVMe PCIe 4.0, Realtek GbE LAN.", precio: 113, categoria: "Placa Madre", stock: 5, tienda: "Grupo Compu & Visión", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/7e22ce/ffffff/png?text=Gigabyte+motherboard+LGA+1851", urlTienda: "https://compuvision.pe/producto/114" , detalles: [{ nombreAtributo: "Socket Motherboard", valor: "LGA1851" }, { nombreAtributo: "Tipo RAM Compatible", valor: "DDR5" }, { nombreAtributo: "Puertos M.2", valor: "2" }] },
    { id: 1043, nombre: "Placa Gigabyte B860M K Gen5 LGA 1851 DDR5", descripcion: "Socket LGA1851 para procesadores Intel Core Ultra, Chipset B860, 2x DDR5, PCIe 5.0 x16, M.2 NVMe PCIe 4.0, Realtek GbE LAN.", precio: 116, categoria: "Placa Madre", stock: 5, tienda: "Infotec Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/7e22ce/ffffff/png?text=Gigabyte+motherboard+LGA+1851", urlTienda: "https://compuvision.pe/producto/114" , detalles: [{ nombreAtributo: "Socket Motherboard", valor: "LGA1851" }, { nombreAtributo: "Tipo RAM Compatible", valor: "DDR5" }, { nombreAtributo: "Puertos M.2", valor: "2" }] },
    { id: 1044, nombre: "Placa Asus ROG STRIX X870E-E GAMING WIFI7 AM5", descripcion: "Socket AM5 para Ryzen 7000/8000/9000, Chipset X870E, DDR5 8000+ MHz OC, 5x M.2 (3x PCIe 5.0), Wi-Fi 7, Intel 2.5G LAN, Audio SupremeFX ALC4080.", precio: 651, categoria: "Placa Madre", stock: 1, tienda: "Grupo Compu & Visión", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/7e22ce/ffffff/png?text=ASUS+ROG+STRIX+motherboard", urlTienda: "https://compuvision.pe/producto/115" , detalles: [{ nombreAtributo: "Socket Motherboard", valor: "AM5" }, { nombreAtributo: "Tipo RAM Compatible", valor: "DDR5" }, { nombreAtributo: "Puertos M.2", valor: "2" }] },
    { id: 1045, nombre: "Placa Asus ROG STRIX X870E-E GAMING WIFI7 AM5", descripcion: "Socket AM5 para Ryzen 7000/8000/9000, Chipset X870E, DDR5 8000+ MHz OC, 5x M.2 (3x PCIe 5.0), Wi-Fi 7, Intel 2.5G LAN, Audio SupremeFX ALC4080.", precio: 660, categoria: "Placa Madre", stock: 1, tienda: "Memory Kings", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/7e22ce/ffffff/png?text=ASUS+ROG+STRIX+motherboard", urlTienda: "https://compuvision.pe/producto/115" , detalles: [{ nombreAtributo: "Socket Motherboard", valor: "AM5" }, { nombreAtributo: "Tipo RAM Compatible", valor: "DDR5" }, { nombreAtributo: "Puertos M.2", valor: "2" }] },
    { id: 1046, nombre: "Memoria RAM 32GB (2x16GB) Corsair Vengeance DDR5 6000MHz", descripcion: "Kit 32GB (2x16GB) DDR5 6000MHz CL36, Disipador de Aluminio Anodizado, Soporte Intel XMP 3.0 / AMD EXPO, Formato UDIMM.", precio: 135, categoria: "Memoria RAM", stock: 8, tienda: "Grupo Compu & Visión", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/b45309/ffffff/png?text=Corsair+Vengeance+DDR5", urlTienda: "https://compuvision.pe/producto/116" , detalles: [{ nombreAtributo: "Tipo RAM", valor: "DDR5" }] },
    { id: 1047, nombre: "Memoria RAM 32GB (2x16GB) Corsair Vengeance DDR5 6000MHz", descripcion: "Kit 32GB (2x16GB) DDR5 6000MHz CL36, Disipador de Aluminio Anodizado, Soporte Intel XMP 3.0 / AMD EXPO, Formato UDIMM.", precio: 138, categoria: "Memoria RAM", stock: 8, tienda: "Memory Kings", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/b45309/ffffff/png?text=Corsair+Vengeance+DDR5", urlTienda: "https://compuvision.pe/producto/116" , detalles: [{ nombreAtributo: "Tipo RAM", valor: "DDR5" }] },
    { id: 1048, nombre: "Disco Sólido SSD 2TB Huadisk M.2 NVMe PCIe 4.0", descripcion: "2TB M.2 2280 NVMe PCIe Gen4 x4, Lectura secuencial hasta 5000 MB/s, Escritura hasta 4500 MB/s, Disipador Térmico Integrado.", precio: 330, categoria: "Almacenamiento", stock: 1, tienda: "Grupo Compu & Visión", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/be123c/ffffff/png?text=M.2+NVMe+SSD", urlTienda: "https://compuvision.pe/producto/117" , detalles: [{ nombreAtributo: "Interfaz Almacenamiento", valor: "NVMe PCIe" }] },
    { id: 1049, nombre: "Disco Sólido SSD 2TB Huadisk M.2 NVMe PCIe 4.0", descripcion: "2TB M.2 2280 NVMe PCIe Gen4 x4, Lectura secuencial hasta 5000 MB/s, Escritura hasta 4500 MB/s, Disipador Térmico Integrado.", precio: 335, categoria: "Almacenamiento", stock: 1, tienda: "SercoPlus", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/be123c/ffffff/png?text=M.2+NVMe+SSD", urlTienda: "https://compuvision.pe/producto/117" , detalles: [{ nombreAtributo: "Interfaz Almacenamiento", valor: "NVMe PCIe" }] },
    { id: 1050, nombre: "Disco Sólido SSD 1TB Samsung 990 Pro M.2 NVMe 2.0", descripcion: "1TB, M.2 2280 NVMe 2.0 PCIe 4.0, Lectura hasta 7450 MB/s, Escritura hasta 6900 MB/s, Controller Samsung Pascal, 1GB DRAM.", precio: 148, categoria: "Almacenamiento", stock: 4, tienda: "SB Data Wilson", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/be123c/ffffff/png?text=Samsung+990+Pro+SSD", urlTienda: "https://compuvision.pe/producto/118" , detalles: [{ nombreAtributo: "Interfaz Almacenamiento", valor: "NVMe PCIe" }] },
    { id: 1051, nombre: "Disco Sólido SSD 1TB Samsung 990 Pro M.2 NVMe 2.0", descripcion: "1TB, M.2 2280 NVMe 2.0 PCIe 4.0, Lectura hasta 7450 MB/s, Escritura hasta 6900 MB/s, Controller Samsung Pascal, 1GB DRAM.", precio: 150, categoria: "Almacenamiento", stock: 4, tienda: "Grupo Compu & Visión", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/be123c/ffffff/png?text=Samsung+990+Pro+SSD", urlTienda: "https://compuvision.pe/producto/118" , detalles: [{ nombreAtributo: "Interfaz Almacenamiento", valor: "NVMe PCIe" }] },
    { id: 1052, nombre: "Disco Sólido SSD 1TB Samsung 990 Pro M.2 NVMe 2.0", descripcion: "1TB, M.2 2280 NVMe 2.0 PCIe 4.0, Lectura hasta 7450 MB/s, Escritura hasta 6900 MB/s, Controller Samsung Pascal, 1GB DRAM.", precio: 152, categoria: "Almacenamiento", stock: 4, tienda: "CompuSearch Norte", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/be123c/ffffff/png?text=Samsung+990+Pro+SSD", urlTienda: "https://compuvision.pe/producto/118" , detalles: [{ nombreAtributo: "Interfaz Almacenamiento", valor: "NVMe PCIe" }] },
    { id: 1053, nombre: "Case Antec VCX100M 450W Micro-ATX 5 Fans RGB", descripcion: "Chasis Micro-ATX / Mini-ITX, Panel lateral de vidrio templado, Incluye 5 ventiladores RGB preinstalados y Fuente de Poder 450W integrada.", precio: 55, categoria: "Case", stock: 1, tienda: "SB Data Wilson", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/0f766e/ffffff/png?text=Micro-ATX+computer+case", urlTienda: "https://sbdata.com.pe/producto/119" , detalles: [{ nombreAtributo: "Consumo", valor: "450W" }] },
    { id: 1054, nombre: "Case Antec VCX100M 450W Micro-ATX 5 Fans RGB", descripcion: "Chasis Micro-ATX / Mini-ITX, Panel lateral de vidrio templado, Incluye 5 ventiladores RGB preinstalados y Fuente de Poder 450W integrada.", precio: 58, categoria: "Case", stock: 1, tienda: "Rayotec", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/0f766e/ffffff/png?text=Micro-ATX+computer+case", urlTienda: "https://sbdata.com.pe/producto/119" , detalles: [{ nombreAtributo: "Consumo", valor: "450W" }] },
    { id: 1055, nombre: "Case Antryx Elegant 630 350W ATX Mid Tower", descripcion: "Gabinete Mid Tower ATX / mATX, Incluye fuente 350W, Puertos frontales USB 3.0 + Audio HD, Bahías 2.5\" SSD y 3.5\" HDD.", precio: 41.5, categoria: "Case", stock: 7, tienda: "SB Data Wilson", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/0f766e/ffffff/png?text=ATX+mid+tower+case", urlTienda: "https://sbdata.com.pe/producto/120" , detalles: [{ nombreAtributo: "Consumo", valor: "350W" }] },
    { id: 1056, nombre: "Case Antryx Elegant 630 350W ATX Mid Tower", descripcion: "Gabinete Mid Tower ATX / mATX, Incluye fuente 350W, Puertos frontales USB 3.0 + Audio HD, Bahías 2.5\" SSD y 3.5\" HDD.", precio: 43, categoria: "Case", stock: 7, tienda: "Infotec Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/0f766e/ffffff/png?text=ATX+mid+tower+case", urlTienda: "https://sbdata.com.pe/producto/120" , detalles: [{ nombreAtributo: "Consumo", valor: "350W" }] },
    { id: 1057, nombre: "Cooler CPU Thermalright Peerless Assassin 120 SE Dual Tower", descripcion: "Disipador por aire de Doble Torre, 6 Heatpipes de cobre de 6mm, 2x Ventiladores PWM de 120mm (1550 RPM), Soporte Sockets LGA1700/1200/115X y AMD AM5/AM4.", precio: 106.73, categoria: "Refrigeración CPU", stock: 2, tienda: "SB Data Wilson", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/0369a1/ffffff/png?text=Thermalright+Peerless+Assassin", urlTienda: "https://sbdata.com.pe/producto/121" , detalles: [{ nombreAtributo: "Compatibilidad Socket Cooler", valor: "LGA1700" }, { nombreAtributo: "Compatibilidad Socket Cooler", valor: "LGA1700, LGA1200, AM4, AM5" }] },
    { id: 1058, nombre: "Cooler CPU Thermalright Peerless Assassin 120 SE Dual Tower", descripcion: "Disipador por aire de Doble Torre, 6 Heatpipes de cobre de 6mm, 2x Ventiladores PWM de 120mm (1550 RPM), Soporte Sockets LGA1700/1200/115X y AMD AM5/AM4.", precio: 109, categoria: "Refrigeración CPU", stock: 2, tienda: "SercoPlus", ubicacion: "Lima", estatus: "STOCK BAJO", urlImagen: "https://placehold.co/600x400/0369a1/ffffff/png?text=Thermalright+Peerless+Assassin", urlTienda: "https://sbdata.com.pe/producto/121" , detalles: [{ nombreAtributo: "Compatibilidad Socket Cooler", valor: "LGA1700" }, { nombreAtributo: "Compatibilidad Socket Cooler", valor: "LGA1700, LGA1200, AM4, AM5" }] },
    { id: 1059, nombre: "Mainboard Gigabyte B760M E DDR5 LGA 1700 mATX", descripcion: "Socket LGA1700 para Intel 12da/13ra/14ta Gen, Chipset B760, 2x DDR5 hasta 5600MHz, PCIe 4.0 x16, 2x M.2 NVMe PCIe 4.0, Realtek GbE LAN.", precio: 107.1, categoria: "Placa Madre", stock: 4, tienda: "SB Data Wilson", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/7e22ce/ffffff/png?text=Gigabyte+B760M", urlTienda: "https://sbdata.com.pe/producto/122" , detalles: [{ nombreAtributo: "Socket Motherboard", valor: "LGA1700" }, { nombreAtributo: "Tipo RAM Compatible", valor: "DDR5" }, { nombreAtributo: "Puertos M.2", valor: "2" }] },
    { id: 1060, nombre: "Mainboard Gigabyte B760M E DDR5 LGA 1700 mATX", descripcion: "Socket LGA1700 para Intel 12da/13ra/14ta Gen, Chipset B760, 2x DDR5 hasta 5600MHz, PCIe 4.0 x16, 2x M.2 NVMe PCIe 4.0, Realtek GbE LAN.", precio: 110, categoria: "Placa Madre", stock: 4, tienda: "pc Factory Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/7e22ce/ffffff/png?text=Gigabyte+B760M", urlTienda: "https://sbdata.com.pe/producto/122" , detalles: [{ nombreAtributo: "Socket Motherboard", valor: "LGA1700" }, { nombreAtributo: "Tipo RAM Compatible", valor: "DDR5" }, { nombreAtributo: "Puertos M.2", valor: "2" }] },
    { id: 1061, nombre: "Mainboard Gigabyte H810M K DDR5 LGA 1851 Intel Core Ultra", descripcion: "Socket LGA1851 para procesadores Intel Core Ultra 200, Chipset H810, 2x DIMM DDR5, PCIe 4.0, M.2 NVMe, LAN GbE.", precio: 95.03, categoria: "Placa Madre", stock: 4, tienda: "SB Data Wilson", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/7e22ce/ffffff/png?text=Gigabyte+motherboard+micro+ATX", urlTienda: "https://sbdata.com.pe/producto/123" , detalles: [{ nombreAtributo: "Socket Motherboard", valor: "LGA1851" }, { nombreAtributo: "Tipo RAM Compatible", valor: "DDR5" }, { nombreAtributo: "Puertos M.2", valor: "2" }] },
    { id: 1062, nombre: "Mainboard Gigabyte H810M K DDR5 LGA 1851 Intel Core Ultra", descripcion: "Socket LGA1851 para procesadores Intel Core Ultra 200, Chipset H810, 2x DIMM DDR5, PCIe 4.0, M.2 NVMe, LAN GbE.", precio: 98, categoria: "Placa Madre", stock: 4, tienda: "Infotec Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/7e22ce/ffffff/png?text=Gigabyte+motherboard+micro+ATX", urlTienda: "https://sbdata.com.pe/producto/123" , detalles: [{ nombreAtributo: "Socket Motherboard", valor: "LGA1851" }, { nombreAtributo: "Tipo RAM Compatible", valor: "DDR5" }, { nombreAtributo: "Puertos M.2", valor: "2" }] },
    { id: 1063, nombre: "Memoria RAM 16GB DDR4 Hiksemi Armor Black 3200MHz", descripcion: "Módulo individual 16GB DDR4, Frecuencia 3200MHz CL16, Disipador térmico de aluminio negro, 1.35V.", precio: 139, categoria: "Memoria RAM", stock: 5, tienda: "SB Data Wilson", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/b45309/ffffff/png?text=DDR4+RAM+module", urlTienda: "https://sbdata.com.pe/producto/124" , detalles: [{ nombreAtributo: "Tipo RAM", valor: "DDR4" }] },
    { id: 1064, nombre: "Memoria RAM 16GB DDR4 Hiksemi Armor Black 3200MHz", descripcion: "Módulo individual 16GB DDR4, Frecuencia 3200MHz CL16, Disipador térmico de aluminio negro, 1.35V.", precio: 142, categoria: "Memoria RAM", stock: 5, tienda: "Rayotec", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/b45309/ffffff/png?text=DDR4+RAM+module", urlTienda: "https://sbdata.com.pe/producto/124" , detalles: [{ nombreAtributo: "Tipo RAM", valor: "DDR4" }] },
    { id: 1065, nombre: "Mainboard MSI A520M-A PRO Socket AM4 DDR4", descripcion: "Socket AM4 para procesadores AMD Ryzen 3000/4000/5000, Chipset A520, 2x DDR4 hasta 4600MHz OC, PCIe 3.0 x16, M.2 NVMe, GbE LAN.", precio: 53.75, categoria: "Placa Madre", stock: 15, tienda: "Infotec Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/7e22ce/ffffff/png?text=MSI+A520M", urlTienda: "https://infotec.com.pe/producto/125" , detalles: [{ nombreAtributo: "Socket Motherboard", valor: "AM4" }, { nombreAtributo: "Tipo RAM Compatible", valor: "DDR4" }, { nombreAtributo: "Puertos M.2", valor: "2" }] },
    { id: 1066, nombre: "Mainboard MSI A520M-A PRO Socket AM4 DDR4", descripcion: "Socket AM4 para procesadores AMD Ryzen 3000/4000/5000, Chipset A520, 2x DDR4 hasta 4600MHz OC, PCIe 3.0 x16, M.2 NVMe, GbE LAN.", precio: 55, categoria: "Placa Madre", stock: 15, tienda: "Rayotec", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/7e22ce/ffffff/png?text=MSI+A520M", urlTienda: "https://infotec.com.pe/producto/125" , detalles: [{ nombreAtributo: "Socket Motherboard", valor: "AM4" }, { nombreAtributo: "Tipo RAM Compatible", valor: "DDR4" }, { nombreAtributo: "Puertos M.2", valor: "2" }] },
    { id: 1067, nombre: "Mainboard MSI A520M-A PRO Socket AM4 DDR4", descripcion: "Socket AM4 para procesadores AMD Ryzen 3000/4000/5000, Chipset A520, 2x DDR4 hasta 4600MHz OC, PCIe 3.0 x16, M.2 NVMe, GbE LAN.", precio: 57, categoria: "Placa Madre", stock: 15, tienda: "pc Factory Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/7e22ce/ffffff/png?text=MSI+A520M", urlTienda: "https://infotec.com.pe/producto/125" , detalles: [{ nombreAtributo: "Socket Motherboard", valor: "AM4" }, { nombreAtributo: "Tipo RAM Compatible", valor: "DDR4" }, { nombreAtributo: "Puertos M.2", valor: "2" }] },
    { id: 1068, nombre: "Mainboard ASUS PRIME A520M-K AMD Ryzen AM4", descripcion: "Socket AM4, Chipset A520, 2x DDR4 4600MHz OC, M.2 PCIe 3.0 x4, HDMI / D-Sub, GbE LAN, Fan Xpert.", precio: 56.5, categoria: "Placa Madre", stock: 12, tienda: "Infotec Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/7e22ce/ffffff/png?text=ASUS+PRIME+A520M", urlTienda: "https://infotec.com.pe/producto/126" , detalles: [{ nombreAtributo: "Socket Motherboard", valor: "AM4" }, { nombreAtributo: "Tipo RAM Compatible", valor: "DDR4" }, { nombreAtributo: "Puertos M.2", valor: "2" }] },
    { id: 1069, nombre: "Mainboard ASUS PRIME A520M-K AMD Ryzen AM4", descripcion: "Socket AM4, Chipset A520, 2x DDR4 4600MHz OC, M.2 PCIe 3.0 x4, HDMI / D-Sub, GbE LAN, Fan Xpert.", precio: 58, categoria: "Placa Madre", stock: 12, tienda: "SercoPlus", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/7e22ce/ffffff/png?text=ASUS+PRIME+A520M", urlTienda: "https://infotec.com.pe/producto/126" , detalles: [{ nombreAtributo: "Socket Motherboard", valor: "AM4" }, { nombreAtributo: "Tipo RAM Compatible", valor: "DDR4" }, { nombreAtributo: "Puertos M.2", valor: "2" }] },
    { id: 1070, nombre: "Mouse Logitech G203 Lightsync Optical 8000 DPI RGB", descripcion: "Sensor Óptico de grado de juego 200 - 8000 DPI, 6 Botones Programables, Iluminación RGB Lightsync con ondas de color, Conexión USB.", precio: 24, categoria: "Periféricos", stock: 20, tienda: "Rayotec", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/475569/ffffff/png?text=Logitech+G203+mouse", urlTienda: "https://rayotec.pe/producto/127" , detalles: [] },
    { id: 1071, nombre: "Mouse Logitech G203 Lightsync Optical 8000 DPI RGB", descripcion: "Sensor Óptico de grado de juego 200 - 8000 DPI, 6 Botones Programables, Iluminación RGB Lightsync con ondas de color, Conexión USB.", precio: 25.5, categoria: "Periféricos", stock: 20, tienda: "SB Data Wilson", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/475569/ffffff/png?text=Logitech+G203+mouse", urlTienda: "https://rayotec.pe/producto/127" , detalles: [] },
    { id: 1072, nombre: "Mouse Logitech G203 Lightsync Optical 8000 DPI RGB", descripcion: "Sensor Óptico de grado de juego 200 - 8000 DPI, 6 Botones Programables, Iluminación RGB Lightsync con ondas de color, Conexión USB.", precio: 27, categoria: "Periféricos", stock: 20, tienda: "pc Factory Perú", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/475569/ffffff/png?text=Logitech+G203+mouse", urlTienda: "https://rayotec.pe/producto/127" , detalles: [] },
    { id: 1073, nombre: "Fuente de Poder Gigabyte 850W 80+ Gold (GP-UD850GM)", descripcion: "Potencia 850W, Certificación 80 PLUS Gold (eficiencia 90%), Totalmente Modular, Condensadores 100% Japoneses, Ventilador de 120mm con rodamiento hidráulico (HYB), Protecciones OVP/OPP/SCP/UVP/OCP/OTP.", precio: 110.8, categoria: "Fuente de Poder", stock: 8, tienda: "Rayotec", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/a16207/ffffff/png?text=Gigabyte+power+supply+850W", urlTienda: "https://rayotec.pe/producto/128" , detalles: [{ nombreAtributo: "Potencia PSU", valor: "850W" }] },
    { id: 1074, nombre: "Fuente de Poder Gigabyte 850W 80+ Gold (GP-UD850GM)", descripcion: "Potencia 850W, Certificación 80 PLUS Gold (eficiencia 90%), Totalmente Modular, Condensadores 100% Japoneses, Ventilador de 120mm con rodamiento hidráulico (HYB), Protecciones OVP/OPP/SCP/UVP/OCP/OTP.", precio: 112.5, categoria: "Fuente de Poder", stock: 8, tienda: "Grupo Compu & Visión", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/a16207/ffffff/png?text=Gigabyte+power+supply+850W", urlTienda: "https://rayotec.pe/producto/128" , detalles: [{ nombreAtributo: "Potencia PSU", valor: "850W" }] },
    { id: 1075, nombre: "Fuente de Poder Gigabyte 850W 80+ Gold (GP-UD850GM)", descripcion: "Potencia 850W, Certificación 80 PLUS Gold (eficiencia 90%), Totalmente Modular, Condensadores 100% Japoneses, Ventilador de 120mm con rodamiento hidráulico (HYB), Protecciones OVP/OPP/SCP/UVP/OCP/OTP.", precio: 115, categoria: "Fuente de Poder", stock: 8, tienda: "SercoPlus", ubicacion: "Lima", estatus: "DISPONIBLE", urlImagen: "https://placehold.co/600x400/a16207/ffffff/png?text=Gigabyte+power+supply+850W", urlTienda: "https://rayotec.pe/producto/128" , detalles: [{ nombreAtributo: "Potencia PSU", valor: "850W" }] }
  ],
  incidentes: [
    { id: 1, titulo: "Fallo en servidor de base de datos", estado: "PENDIENTE", fecha: "2026-10-01", prioridad: "ALTA" },
    { id: 2, titulo: "Actualización de catálogo de componentes Wilson", estado: "RESUELTO", fecha: "2026-09-28", prioridad: "MEDIA" }
  ],
  empleados: [
    { id: 1, nombre: "Juan Técnico", puesto: "Soporte Nivel 2", sede: "CompuSearch Central", estado: "ACTIVO" },
    { id: 2, nombre: "María Asesora", puesto: "Atención al Cliente", sede: "pc Factory Perú", estado: "ACTIVO" },
    { id: 3, nombre: "Carlos Armador", puesto: "Especialista Ensamble PC", sede: "SB Data Wilson", estado: "ACTIVO" }
  ],
    categorias: [
    { id: 1, nombre: "Procesador", urlImagen: "https://cdn-icons-png.flaticon.com/512/2004/2004699.png", nombreImagen: "cpu.png" },
    { id: 2, nombre: "Tarjeta de Video", urlImagen: "https://cdn-icons-png.flaticon.com/512/2004/2004724.png", nombreImagen: "gpu.png" },
    { id: 3, nombre: "Memoria RAM", urlImagen: "https://cdn-icons-png.flaticon.com/512/2004/2004712.png", nombreImagen: "ram.png" },
    { id: 4, nombre: "Placa Madre", urlImagen: "https://cdn-icons-png.flaticon.com/512/2004/2004732.png", nombreImagen: "mobo.png" },
    { id: 5, nombre: "Almacenamiento", urlImagen: "https://cdn-icons-png.flaticon.com/512/2004/2004705.png", nombreImagen: "ssd.png" },
    { id: 6, nombre: "Case", urlImagen: "https://cdn-icons-png.flaticon.com/512/2004/2004718.png", nombreImagen: "case.png" },
    { id: 7, nombre: "Refrigeración CPU", urlImagen: "https://cdn-icons-png.flaticon.com/512/2004/2004728.png", nombreImagen: "cooler.png" },
    { id: 8, nombre: "Fuente de Poder", urlImagen: "https://cdn-icons-png.flaticon.com/512/2004/2004715.png", nombreImagen: "psu.png" },
    { id: 9, nombre: "Periféricos", urlImagen: "https://cdn-icons-png.flaticon.com/512/2004/2004738.png", nombreImagen: "perifericos.png" }
  ]
}

// ==========================================
// 2. DEFINICIÓN DE ENDPOINTS (Handlers)
// ==========================================

export const handlers = [
  // --- MOCK DE SERVICIOS EXTERNOS ---
  http.get('https://api.ipify.org/', () => {
    return HttpResponse.json({ ip: "192.168.1.1" })
  }),
  http.get('https://api.ipify.org', () => {
    return HttpResponse.json({ ip: "192.168.1.1" })
  }),

  // --- ENDPOINTS DE DASHBOARD / EMPLEADO ---
  http.get('/empleado/dashboard', () => {
    return HttpResponse.json({
        totalTiendas: db.tiendas.length,
        tiendasVerificadas: db.tiendas.filter(t => t.estado === "ACTIVO").length,
        tiendasNoVerificadas: db.tiendas.filter(t => t.estado !== "ACTIVO").length,
        totalEmpleados: 2,
        totalUsuarios: db.usuarios.length,
        totalProductos: db.productos.length,
        productosActivos: db.productos.filter(p => p.stock > 0).length,
        productosInactivos: db.productos.filter(p => p.stock === 0).length,
        solicitudesPendientes: 3,
        solicitudesAceptadas: 15,
        solicitudesRechazadas: 2,
        totalSolicitudes: 20,
        suscripcionesActivas: 8,
        suscripcionesExpiradas: 1,
        totalSuscripciones: 9,
        totalIncidentes: 5,
        ingresosTotales: 12500.50,
        totalPagos: 45,
        ultimasTiendas: db.tiendas.slice(0, 3).map(t => ({ idTienda: t.id, nombreTienda: t.nombre, verificado: t.estado === "ACTIVO" })),
        ultimosEmpleados: db.usuarios.filter(u => u.tipoUsuario === "EMPLEADO").slice(0, 3).map(u => ({ idEmpleado: u.id, nombre: u.nombre, email: u.email })),
        ultimosPagos: [
            { idPago: 1, tiendaNombre: "CompuSearch Central", monto: 250, estado: "COMPLETADO" },
            { idPago: 2, tiendaNombre: "pc Factory Perú", monto: 150, estado: "PENDIENTE" }
        ]
    })
  }),

  // --- ENDPOINTS DE USUARIOS / AUTH ---
  // Variable para simular la sesión en memoria
  ...(() => {
      let mockSessionUser = null;
      return [
        http.get('/auth/me', () => {
          if (mockSessionUser) {
            return HttpResponse.json({ ...mockSessionUser, idUsuario: mockSessionUser.id })
          }
          return HttpResponse.json({ user: null }, { status: 401 })
        }),

        http.post('/auth/login', async ({ request }) => {
          const body = await request.json()
          const identificador = body?.identificador
          
          let usuario = db.usuarios.find(u => u.email === identificador)
          if (!usuario) {
              usuario = db.usuarios[0] // Fallback al admin si ponen otro correo
          }

          mockSessionUser = usuario; // Guardar en "sesion"

          return HttpResponse.json({
            token: "mock-jwt-token-12345",
            user: { ...usuario, idUsuario: usuario.id }
          })
        }),

        http.post('/auth/logout', () => {
          mockSessionUser = null;
          return HttpResponse.json({ message: "Sesión cerrada" })
        }),

        http.post('/auth/refresh', () => {
          return HttpResponse.json({ token: "nuevo-mock-jwt-token" })
        })
      ]
  })(),



  http.get('/usuario/:id', ({ params }) => {
    const usuario = db.usuarios.find(u => u.id === Number(params.id))
    return usuario 
      ? HttpResponse.json(usuario) 
      : HttpResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
  }),

  http.get('/usuario', () => {
    return HttpResponse.json({ content: db.usuarios, totalElements: db.usuarios.length, totalPages: 1 })
  }),

  
  http.get('/etiquetas/todas', () => {
    return HttpResponse.json(db.etiquetas)
  }),

  http.get('/etiquetas', () => {
    return HttpResponse.json({ content: db.etiquetas, totalElements: db.etiquetas.length, totalPages: 1 })
  }),

  // --- ENDPOINTS DE CATEGORIAS ---
  http.get('/categorias/todas', () => {
    return HttpResponse.json(db.categorias)
  }),

  http.get('/categorias', () => {
    const paginated = db.categorias.map(c => ({ idCategoria: c.id, id: c.id, nombre: c.nombre, descripcion: "Descripción de categoría", nombreImagen: c.nombreImagen, urlImagen: c.urlImagen }));
    return HttpResponse.json({ content: paginated, totalElements: paginated.length, totalPages: 1 })
  }),

  // --- ENDPOINTS DE TIENDAS ---
  http.get('/tiendas', () => {
    return HttpResponse.json({ content: db.tiendas, totalElements: db.tiendas.length, totalPages: 1, number: 0 })
  }),

  http.get('/tiendas/verificadas', () => {
    return HttpResponse.json(db.tiendas.filter(t => t.estado === "ACTIVO"))
  }),



  // --- ENDPOINTS DE PRODUCTOS Y COMPONENTES ---
  http.get('/productos', () => {
    return HttpResponse.json(db.productos)
  }),

  http.get('/componentes/filtrar', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 0)
    const size = Number(url.searchParams.get('size') || 15)
    
    // Agrupar por nombre y obtener el más barato
    const grouped = Array.from(db.productos.reduce((acc, p) => {
        if (!acc.has(p.nombre) || acc.get(p.nombre).precio > p.precio) {
            acc.set(p.nombre, p);
        }
        return acc;
    }, new Map()).values());

    // Paginación
    const start = page * size
    const end = start + size
    const paginatedItems = grouped.slice(start, end).map(p => ({
        idProductoTienda: p.id,
        nombreProducto: p.nombre,
        nombreTienda: p.tienda,
        precio: p.precio,
        stock: p.stock,
        urlImagen: p.urlImagen,
        urlTienda: p.urlTienda,
        detalles: p.detalles || []
    }))
    
    return HttpResponse.json({
      content: paginatedItems,
      totalElements: grouped.length,
      totalPages: Math.ceil(grouped.length / size),
      size: size,
      number: page
    })
  }),

  // Búsqueda de productos
  http.get('/componentes/buscar', ({ request }) => {
    const url = new URL(request.url)
    const nombre = url.searchParams.get('nombre')?.toLowerCase() || ""
    const page = Number(url.searchParams.get('page') || 0)
    const size = Number(url.searchParams.get('size') || 15)
    
    // Agrupar por nombre y obtener el más barato
    const grouped = Array.from(db.productos.reduce((acc, p) => {
        if (!acc.has(p.nombre) || acc.get(p.nombre).precio > p.precio) {
            acc.set(p.nombre, p);
        }
        return acc;
    }, new Map()).values());

    const filtrados = grouped.filter(p => p.nombre.toLowerCase().includes(nombre))
    const start = page * size
    const end = start + size
    const paginatedItems = filtrados.slice(start, end).map(p => ({
        idProductoTienda: p.id,
        nombreProducto: p.nombre,
        nombreTienda: p.tienda,
        precio: p.precio,
        stock: p.stock,
        urlImagen: p.urlImagen,
        urlTienda: p.urlTienda,
        detalles: p.detalles || []
    }))
    
    return HttpResponse.json({
      content: paginatedItems,
      totalElements: filtrados.length,
      totalPages: Math.ceil(filtrados.length / size),
      size: size,
      number: page
    })
  }),

  // Tiendas que venden un producto específico
  http.get('/componentes/tiendas', ({ request }) => {
    const url = new URL(request.url)
    const nombre = url.searchParams.get('nombreProducto')
    
    // Simulamos que al menos la tienda original vende el producto,
    // y para dar más realismo, copiamos el producto para otra tienda si es el único
    let tiendas = db.productos.filter(p => p.nombre === nombre)
    
    if (tiendas.length === 0) {
      return HttpResponse.json([])
    }
    
    // Ordenar de menor a mayor precio (mejor precio primero)
    tiendas.sort((a, b) => a.precio - b.precio)
    
    // El frontend espera un array
    return HttpResponse.json(tiendas.map(p => ({
        idProductoTienda: p.id,
        nombreProducto: p.nombre,
        nombreTienda: p.tienda,
        precio: p.precio,
        stock: p.stock,
        urlProducto: p.urlTienda // requerido por TablaTiendas
    })))
  }),

  // Info detallada del producto en una tienda específica
  http.get('/componentes/info', ({ request }) => {
    const url = new URL(request.url)
    const nombre = url.searchParams.get('nombreProducto')
    const tienda = url.searchParams.get('nombreTienda')
    
    const producto = db.productos.find(p => p.nombre === nombre && p.tienda === tienda) || db.productos.find(p => p.nombre === nombre)
    
    if (producto) {
      return HttpResponse.json({
        idProductoTienda: producto.id,
        nombreProducto: producto.nombre,
        descripcion: producto.descripcion,
        nombreTienda: producto.tienda,
        precio: producto.precio,
        stock: producto.stock,
        urlImagen: producto.urlImagen,
        urlTienda: producto.urlTienda,
        urlProducto: producto.urlTienda
      })
    }
    
    return HttpResponse.json(null, { status: 404 })
  }),

  // --- ENDPOINTS DE FILTROS ---
  http.get('/filtro/categorias', () => {
    return HttpResponse.json(["CPU", "GPU", "RAM", "Motherboard", "Almacenamiento", "Case", "Enfriamiento", "Fuentes", "Periféricos"])
  }),
  http.get('/filtro/precios', () => {
    return HttpResponse.json({ precioMin: 10, precioMax: 5000 })
  }),
  http.get('/filtro/marcas', () => {
    return HttpResponse.json(["Intel", "AMD", "NVIDIA", "MSI", "Gigabyte", "Asus", "Corsair", "Samsung", "Logitech"])
  }),
  http.get('/filtro/tiendas', () => {
    return HttpResponse.json(db.tiendas.map(t => t.nombre))
  }),
  http.get('/filtro/valores', () => {
    return HttpResponse.json(["Alta", "Media", "Baja", "RGB", "DDR4", "DDR5"])
  }),

  // Catch-all para cualquier otra petición a /componentes o /metricas que no hayamos simulado
  http.all('/componentes/*', () => {
    return HttpResponse.json([])
  }),

  http.all('/metricas/*', () => {
    return HttpResponse.json({})
  }),

  http.get('/productos/:id', ({ params }) => {
    const producto = db.productos.find(p => p.id === Number(params.id))
    return producto 
      ? HttpResponse.json(producto) 
      : HttpResponse.json({ error: "Producto no encontrado" }, { status: 404 })
  }),

  // --- ENDPOINTS DE EMPLEADOS E INCIDENTES ---
  http.get('/empleados', () => {
    return HttpResponse.json(db.empleados)
  }),

  http.get('/incidentes', () => {
    return HttpResponse.json(db.incidentes)
  }),

  // --- ENDPOINTS DE ETIQUETAS ---
  http.get('/etiquetas/todas', () => {
    return HttpResponse.json(db.etiquetas)
  }),

  // --- ENDPOINTS DE BUILDS ---
  http.get('/builds/productos', ({ request }) => {
    const url = new URL(request.url)
    const categoria = url.searchParams.get('categoria')
    const page = Number(url.searchParams.get('page') || 0)
    const size = Number(url.searchParams.get('size') || 8)
    
    // Grouping by name
    const grouped = Array.from(db.productos.reduce((acc, p) => {
        if (!acc.has(p.nombre) || acc.get(p.nombre).precio > p.precio) {
            acc.set(p.nombre, p);
        }
        return acc;
    }, new Map()).values());

    const filtrados = categoria && categoria !== "Todas" ? grouped.filter(p => p.categoria === categoria) : grouped;
    
    const start = page * size
    const end = start + size
    const paginatedItems = filtrados.slice(start, end).map(p => ({
        idProductoTienda: p.id,
        nombreProducto: p.nombre,
        nombreTienda: p.tienda,
        precio: p.precio,
        stock: p.stock,
        urlImagen: p.urlImagen,
        urlTienda: p.urlTienda,
        categoria: p.categoria,
        detalles: p.detalles || []
    }))

    return HttpResponse.json({
      content: paginatedItems,
      totalElements: filtrados.length,
      totalPages: Math.ceil(filtrados.length / size),
      size: size,
      number: page
    })
  }),

  http.get('/builds', () => {
    return HttpResponse.json(db.builds)
  }),

  http.post('/builds', async ({ request }) => {
    const body = await request.json()
    const newBuild = { ...body, idBuild: Date.now() }
    db.builds.push(newBuild)
    return HttpResponse.json(newBuild, { status: 201 })
  }),

  http.put('/builds/:id', async ({ request, params }) => {
    const id = Number(params.id)
    const body = await request.json()
    const index = db.builds.findIndex(b => b.idBuild === id)
    if (index !== -1) {
      db.builds[index] = { ...db.builds[index], ...body }
      return HttpResponse.json(db.builds[index])
    }
    return HttpResponse.json({ message: "Build no encontrada" }, { status: 404 })
  }),

  http.get('/builds/:id', ({ params }) => {
    const build = db.builds.find(b => b.idBuild === Number(params.id))
    return build ? HttpResponse.json(build) : HttpResponse.json({ message: "Build no encontrada" }, { status: 404 })
  }),

  http.delete('/builds/:id', ({ params }) => {
    const id = Number(params.id)
    const index = db.builds.findIndex(b => b.idBuild === id)
    if (index !== -1) {
      db.builds.splice(index, 1)
      return HttpResponse.json({ message: "Build eliminada" })
    }
    return HttpResponse.json({ message: "Build no encontrada" }, { status: 404 })
  }),

  http.get('/builds/usuario/:id', ({ params, request }) => {
    const idUsuario = Number(params.id)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 0)
    const size = Number(url.searchParams.get('size') || 5)

    const filtrados = db.builds.filter(b => b.idUsuario === idUsuario)
    
    const start = page * size
    const end = start + size
    const paginatedItems = filtrados.slice(start, end)

    return HttpResponse.json({
      content: paginatedItems,
      totalElements: filtrados.length,
      totalPages: Math.ceil(filtrados.length / size),
      size: size,
      number: page
    })
  }),

  http.get('/builds/export/:id', ({ params }) => {
    return new HttpResponse("mock-excel-data", {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    })
  }),

  // --- ENDPOINTS FALTANTES PARA EVITAR CRASHES EN LOS PERFILES ---
  http.get('/tiendas/dashboard/:id', ({ params }) => {
    const tienda = db.tiendas.find(t => t.id === Number(params.id)) || db.tiendas[0];
    return HttpResponse.json({
        nombre: tienda.nombre,
        descripcion: tienda.garantia,
        verificado: tienda.estado === "ACTIVO",
        telefono: tienda.telefono,
        direccion: tienda.direccion,
        urlPagina: tienda.urlPagina,
        fechaAfiliacion: "2023-01-15",
        totalProductos: 42,
        totalEtiquetas: 2,
        totalSuscripciones: 1,
        plan: { nombre: "Plan Pro", fechaInicio: "2024-01-01", fechaFin: "2025-01-01", estado: "ACTIVO" },
        tienda: { urlBase: "https://api." + tienda.nombre.toLowerCase().replace(/\s/g, "") + ".com", estadoAPI: "ACTIVO" },
        logoBase64: ""
    })
  }),

  http.get('/incidentes', () => HttpResponse.json({ content: [], totalElements: 0, totalPages: 0 })),
  http.get('/solicitud', () => HttpResponse.json({ content: [], totalElements: 0, totalPages: 0 })),
  http.get('/planes', () => HttpResponse.json({ content: [{ id: 1, nombre: "Plan Básico", precio: 50 }], totalElements: 1, totalPages: 1 })),
  http.get('/empleado', () => HttpResponse.json({ content: db.usuarios.filter(u => u.tipoUsuario === "EMPLEADO"), totalElements: 2, totalPages: 1 })),
  http.get('/reportes/*', () => HttpResponse.json([])),

  // Search Endpoint
  http.get('/componentes/buscar', ({ request }) => {
    const url = new URL(request.url);
    const nombre = url.searchParams.get('nombre')?.toLowerCase() || "";
    const categoria = url.searchParams.get('categoria') || "";
    
    let filtrados = db.productos.filter(p => p.nombre.toLowerCase().includes(nombre));
    
    if (categoria) {
      // Find matching category or treat it case-insensitively
      filtrados = filtrados.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    }

    const size = Number(url.searchParams.get('size')) || 5;
    const content = filtrados.slice(0, size).map(p => ({
        idProductoTienda: p.id,
        nombreProducto: p.nombre,
        precio: p.precio,
        urlImagen: p.urlImagen || "https://via.placeholder.com/50",
        categoria: p.categoria
    }));

    return HttpResponse.json({
        content,
        totalElements: filtrados.length
    });
  })


]
