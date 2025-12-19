package com.simulacion.api;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.simulacion.api.model.Atributo;
import com.simulacion.api.model.Producto;
import com.simulacion.api.model.ProductoAtributo;
import com.simulacion.api.model.Tienda;
import com.simulacion.api.repository.AtributoRepository;
import com.simulacion.api.repository.ProductoAtributoRepository;
import com.simulacion.api.repository.ProductoRepository;
import com.simulacion.api.repository.TiendaRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

        private final TiendaRepository tiendaRepository;
        private final AtributoRepository atributoRepository;
        private final ProductoRepository productoRepository;
        private final ProductoAtributoRepository productoAtributoRepository;

        @Override
        public void run(String... args) throws Exception {
                initTiendas();
                initAtributos();
                initProductos();
        }

        private void initTiendas() {
                if (tiendaRepository.count() == 0) {

                        Tienda tienda1 = new Tienda();
                        tienda1.setNombre("Tienda A");
                        tienda1.setDireccionApi("http://api.tiendaA.com");

                        Tienda tienda2 = new Tienda();
                        tienda2.setNombre("Tienda B");
                        tienda2.setDireccionApi("http://api.tiendaB.com");

                        Tienda tienda3 = new Tienda();
                        tienda3.setNombre("Tienda C");
                        tienda3.setDireccionApi("http://api.tiendaC.com");

                        tiendaRepository.saveAll(List.of(tienda1, tienda2, tienda3));
                }
        }

        private void initAtributos() {

                if (atributoRepository.count() == 0) {

                        String[] nombresAtributos = {

                                        "Socket CPU", "Núcleos CPU", "Hilos CPU", "Frecuencia Base CPU",
                                        "Frecuencia Turbo CPU", "Caché L3 CPU", "Consumo CPU",

                                        "Socket Motherboard", "Chipset Motherboard", "Factor de Forma Motherboard",
                                        "Slots RAM", "RAM Máxima", "Tipo RAM Compatible", "Puertos M.2", "Puertos SATA",
                                        "Consumo Motherboard",

                                        "Tipo RAM", "Capacidad RAM", "Frecuencia RAM", "Latencia CAS RAM",
                                        "Perfil XMP RAM", "Número de Módulos RAM", "Consumo RAM",

                                        "Tipo de Almacenamiento", "Capacidad Almacenamiento",
                                        "Interfaz Almacenamiento",
                                        "Velocidad Lectura", "Velocidad Escritura", "Consumo Almacenamiento",

                                        "Interfaz PCIe GPU", "Conectores Energía GPU", "Factor de Forma GPU",
                                        "Memoria VRAM", "Tipo de VRAM", "Frecuencia Base GPU", "Frecuencia Boost GPU",
                                        "Salidas de Video GPU", "Consumo GPU", "Fabricante GPU",

                                        "Tipo de Enfriamiento", "Compatibilidad Socket Cooler",
                                        "Tamaño Ventilador", "Nivel de Ruido Cooler", "ARGB Cooler", "Consumo Cooler",

                                        "Potencia PSU", "Certificación PSU", "Formato PSU", "Modularidad PSU",
                                        "Eficiencia PSU",
                                        "Consumo PSU"
                        };

                        List<Atributo> atributos = new ArrayList<>();

                        for (String nombre : nombresAtributos) {
                                Atributo atributo = new Atributo();
                                atributo.setNombre(nombre);
                                atributos.add(atributo);
                        }

                        atributoRepository.saveAll(atributos);
                }
        }

        private void initProductos() {
                // TARJETAS DE VIDEO
                crearProductoConAtributos(
                                1,
                                "Tarjeta Gráfica ASUS TUF Gaming GeForce RTX 4070 12GB GDDR6X",
                                "ASUS",
                                "TUF Gaming GeForce RTX 4070 OC",
                                "Potente tarjeta gráfica con 12 GB de memoria GDDR6X, ideal para juegos en 1440p con alto rendimiento, refrigeración avanzada y diseño robusto de la línea TUF.",
                                "Tarjeta de Video",
                                10,
                                "https://computershopperu.com/categoria/79-tarjeta-video-nvidia-geforce-rtx",
                                "https://www.impacto.com.pe/storage/products/md/168780945480168.jpg",
                                "1299.90",
                                Map.of(
                                                "Interfaz PCIe GPU", "PCIe 4.0 x16",
                                                "Conectores Energía GPU", "2 x 8 pines",
                                                "Factor de Forma GPU", "2.5 Slots",
                                                "Memoria VRAM", "12 GB",
                                                "Tipo de VRAM", "GDDR6X",
                                                "Frecuencia Base GPU", "1920 MHz",
                                                "Frecuencia Boost GPU", "2475 MHz",
                                                "Salidas de Video GPU", "HDMI 2.1 x1, DisplayPort 1.4a x3",
                                                "Consumo GPU", "200 W",
                                                "Fabricante GPU", "NVIDIA"));

                crearProductoConAtributos(
                                2,
                                "Tarjeta Gráfica ASUS TUF Gaming GeForce RTX 4070 12GB GDDR6X",
                                "ASUS",
                                "TUF Gaming GeForce RTX 4070 OC",
                                "Potente tarjeta gráfica con 12 GB de memoria GDDR6X, ideal para juegos en 1440p con alto rendimiento, refrigeración avanzada y diseño robusto de la línea TUF.",
                                "Tarjeta de Video",
                                10,
                                "https://www.impacto.com.pe/producto/tarjeta-de-video-asus-tuf-rtx-4070-12gb-gddr6x-gaming-geforce-nvidia-192-bits-grafico-para-videojuegos-3-ventiladores-90yv0iz1-m0aa00",
                                "https://www.impacto.com.pe/storage/products/md/168780945480168.jpg",
                                "1299.90",
                                Map.of(
                                                "Interfaz PCIe GPU", "PCIe 4.0 x16",
                                                "Conectores Energía GPU", "2 x 8 pines",
                                                "Factor de Forma GPU", "2.5 Slots",
                                                "Memoria VRAM", "12 GB",
                                                "Tipo de VRAM", "GDDR6X",
                                                "Frecuencia Base GPU", "1920 MHz",
                                                "Frecuencia Boost GPU", "2475 MHz",
                                                "Salidas de Video GPU", "HDMI 2.1 x1, DisplayPort 1.4a x3",
                                                "Consumo GPU", "200 W",
                                                "Fabricante GPU", "NVIDIA"));

                crearProductoConAtributos(
                                3,
                                "Tarjeta Gráfica MSI GeForce RTX 4080 GAMING X TRIO 16GB",
                                "MSI", "GAMING X TRIO 16GB",
                                "Tarjeta gráfica de gama alta con 16 GB GDDR6X para resoluciones 4K y ray tracing.",
                                "Tarjeta de Video",
                                8,
                                "https://computershopperu.com/producto/tarjeta-video-nvidia-geforce-rtx/35587-tarjeta-de-video-msi-geforce-rtx-3060-12gb-gddr6-192bits-ventus-2x-oc-edition-pn912-v397-658.html",
                                "https://computershopperu.com/6389-medium_default/tarjeta-de-video-msi-geforce-rtx-3060-12gb-gddr6-192bits-ventus-2x-oc-edition-pn912-v397-658.jpg",
                                "1588.90",
                                Map.of(
                                                "Interfaz PCIe GPU", "PCIe 4.0 x16",
                                                "Conectores Energía GPU", "1 x 16 pines",
                                                "Factor de Forma GPU", "3 Slots",
                                                "Memoria VRAM", "16 GB",
                                                "Tipo de VRAM", "GDDR6X",
                                                "Frecuencia Base GPU", "2205 MHz",
                                                "Frecuencia Boost GPU", "2505 MHz",
                                                "Salidas de Video GPU", "HDMI 2.1 x1, DisplayPort 1.4a x3",
                                                "Consumo GPU", "320 W",
                                                "Fabricante GPU", "NVIDIA"));

                crearProductoConAtributos(
                                1,
                                "Tarjeta Gráfica GIGABYTE GeForce RTX 3060 GAMING OC 12G",

                                "GIGABYTE",
                                "GAMING OC 12G",
                                "Tarjeta gráfica de gama media con excelente rendimiento en 1080p y 1440p.",
                                "Tarjeta de Video",
                                12,
                                "https://computershopperu.com/producto/tarjeta-video-nvidia-geforce-rtx/35587-tarjeta-de-video-msi-geforce-rtx-3060-12gb-gddr6-192bits-ventus-2x-oc-edition-pn912-v397-658.html",
                                "https://computershopperu.com/6389-medium_default/tarjeta-de-video-msi-geforce-rtx-3060-12gb-gddr6-192bits-ventus-2x-oc-edition-pn912-v397-658.jpg",
                                "499.90",
                                Map.of(
                                                "Interfaz PCIe GPU", "PCIe 4.0 x16",
                                                "Conectores Energía GPU", "1 x 8 pines",
                                                "Factor de Forma GPU", "2 Slots",
                                                "Memoria VRAM", "12 GB",
                                                "Tipo de VRAM", "GDDR6",
                                                "Frecuencia Base GPU", "1320 MHz",
                                                "Frecuencia Boost GPU", "1837 MHz",
                                                "Salidas de Video GPU", "HDMI 2.1 x2, DisplayPort 1.4a x2",
                                                "Consumo GPU", "170 W",
                                                "Fabricante GPU", "NVIDIA"));

                crearProductoConAtributos(
                                2,
                                "Tarjeta Gráfica ASUS Dual GeForce GTX 1650 OC 4GB",

                                "ASUS",
                                "Dual GTX 1650 OC",
                                "Tarjeta gráfica de entrada ideal para gaming en 1080p con bajo consumo energético.",
                                "Tarjeta de Video",
                                20,
                                "https://www.impacto.com.pe/producto/tarjeta-de-video-asus-gtx-1650-dual-4gb-gddr6-90y0ezd-m0aa00-geforce-nvidia-128-bits-2-ventiladores",
                                "https://www.impacto.com.pe/storage/products/md/173842755660307.jpg",
                                "189.90",
                                Map.of(
                                                "Interfaz PCIe GPU", "PCIe 3.0 x16",
                                                "Conectores Energía GPU", "1 x 6 pines",
                                                "Factor de Forma GPU", "2 Slots",
                                                "Memoria VRAM", "4 GB",
                                                "Tipo de VRAM", "GDDR5",
                                                "Frecuencia Base GPU", "1485 MHz",
                                                "Frecuencia Boost GPU", "1665 MHz",
                                                "Salidas de Video GPU", "HDMI 2.0b x1, DisplayPort 1.4 x1, DVI-D x1",
                                                "Consumo GPU", "75 W",
                                                "Fabricante GPU", "NVIDIA"));

                // PLACA MADRE
                crearProductoConAtributos(
                                3,
                                "Placa Madre ASRock B450M-HDV R4.0",
                                "ASRock",
                                "B450M-HDV R4.0",
                                "Placa madre micro ATX económica compatible con procesadores AMD AM4.",
                                "Placa Madre",
                                20,
                                "https://www.impacto.com.pe/producto/placa-madre-asrock-b450m-hdv-r4-0-90-mxb9n0-a0uayz-socket-am4-ram-ddr4-buss-3200oc-mhz",
                                "https://www.impacto.com.pe/storage/products/md/173825526395089.webp",
                                "89.90",
                                Map.of(
                                                "Socket Motherboard", "AM4",
                                                "Chipset Motherboard", "B450",
                                                "Factor de Forma Motherboard", "Micro-ATX",
                                                "Slots RAM", "2",
                                                "RAM Máxima", "64 GB",
                                                "Tipo RAM Compatible", "DDR4",
                                                "Puertos M.2", "1",
                                                "Puertos SATA", "4",
                                                "Consumo Motherboard", "35 W"));

                crearProductoConAtributos(
                                1,
                                "Placa Madre ASUS PRIME B550M-A WIFI II",
                                "ASUS",
                                "PRIME B550M-A WIFI II",
                                "Placa madre Micro-ATX con chipset B550, Wi-Fi integrado y soporte para procesadores AMD Ryzen.",
                                "Placa Madre",
                                10,
                                "https://sercoplus.com/socket-amd-am4/12106-mainboard-asus-prime-b550-a-ac-am4-amd.html",
                                "https://sercoplus.com/68541-large_default/mainboard-asus-prime-b550-a-ac-am4-amd.jpg",
                                "370.90",
                                Map.of(
                                                "Socket Motherboard", "AM4",
                                                "Chipset Motherboard", "B550",
                                                "Factor de Forma Motherboard", "Micro-ATX",
                                                "Slots RAM", "4",
                                                "RAM Máxima", "128 GB",
                                                "Tipo RAM Compatible", "DDR4",
                                                "Puertos M.2", "2",
                                                "Puertos SATA", "4",
                                                "Consumo Motherboard", "50 W"));

                crearProductoConAtributos(
                                2,
                                "Placa Madre MSI B450 TOMAHAWK MAX II",

                                "MSI",
                                "B450 TOMAHAWK MAX II",
                                "Placa madre ATX confiable para plataformas AM4, ideal para builds de gama media.",
                                "Placa Madre",
                                8,
                                "https://computershopperu.com/categoria/32-placas-madre?page=5",
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtFgQSlk23fSsLPhRXD1vlP5_x_Ahe3oPxig&s",
                                "149.90",
                                Map.of(
                                                "Socket Motherboard", "AM4",
                                                "Chipset Motherboard", "B450",
                                                "Factor de Forma Motherboard", "ATX",
                                                "Slots RAM", "4",
                                                "RAM Máxima", "128 GB",
                                                "Tipo RAM Compatible", "DDR4",
                                                "Puertos M.2", "1",
                                                "Puertos SATA", "6",
                                                "Consumo Motherboard", "45 W"));

                // PROCESADOR
                crearProductoConAtributos(
                                3,
                                "Procesador AMD Ryzen 7 5800X 8 Núcleos 16 Hilos",

                                "AMD",
                                "Ryzen 7 5800X",
                                "Procesador de alto rendimiento con 8 núcleos y 16 hilos...",
                                "Procesador",
                                12,
                                "https://www.impacto.com.pe/producto/procesador-amd-ryzen-7-5800x-3-8ghz-hasta-4-7ghz-36mb-100-100000063wof-am4-8-nucleos-scooler",
                                "https://www.impacto.com.pe/storage/products/16076152142.jpg",
                                "399.90",
                                Map.of(
                                                "Socket CPU", "AM4",
                                                "Núcleos CPU", "8",
                                                "Hilos CPU", "16",
                                                "Frecuencia Base CPU", "3.8 GHz",
                                                "Frecuencia Turbo CPU", "4.7 GHz",
                                                "Caché L3 CPU", "32 MB",
                                                "Consumo CPU", "105 W"));

                crearProductoConAtributos(
                                1,
                                "Procesador Intel Core i7-12700K",
                                "Procesador",
                                "Intel",
                                "Core i7-12700K",
                                "Procesador de 12 núcleos (8P+4E) de 12ª generación con alto rendimiento para gaming y productividad.",
                                10,
                                "https://sercoplus.com/cpu-1700-12va-generacion/13189-procesador-intel-core-i7-12700k.html",
                                "https://sercoplus.com/56450-large_default/procesador-intel-core-i7-12700k.jpg",
                                "419.90",
                                Map.of(
                                                "Socket CPU", "LGA1700",
                                                "Núcleos CPU", "12",
                                                "Hilos CPU", "20",
                                                "Frecuencia Base CPU", "3.6 GHz",
                                                "Frecuencia Turbo CPU", "5.0 GHz",
                                                "Caché L3 CPU", "25 MB",
                                                "Consumo CPU", "125 W"));

                crearProductoConAtributos(
                                2,
                                "Procesador AMD Ryzen 5 5600X",

                                "AMD",
                                "Ryzen 5 5600X",
                                "Procesador de 6 núcleos y 12 hilos con gran eficiencia y rendimiento en juegos.",
                                "Procesador",
                                15,
                                "https://computershopperu.com/producto/amd-ryzen-series-5000/6313-procesador-amd-ryzen-5-5600x-370ghz-hasta-460ghz-35mb-6-core-am4-pn100-100000065box.html",
                                "https://computershopperu.com/4010-medium_default/procesador-amd-ryzen-5-5600x-370ghz-hasta-460ghz-35mb-6-core-am4-pn100-100000065box.jpg",
                                "249.90",
                                Map.of(
                                                "Socket CPU", "AM4",
                                                "Núcleos CPU", "6",
                                                "Hilos CPU", "12",
                                                "Frecuencia Base CPU", "3.7 GHz",
                                                "Frecuencia Turbo CPU", "4.6 GHz",
                                                "Caché L3 CPU", "32 MB",
                                                "Consumo CPU", "65 W"));

                crearProductoConAtributos(
                                3,
                                "Procesador Intel Core i5-10400F",

                                "Intel",
                                "Core i5-10400F",
                                "Procesador de 6 núcleos y 12 hilos con gran rendimiento y buena relación calidad-precio.",
                                "Procesador",
                                20,
                                "https://www.impacto.com.pe/producto/procesador-intel-core-i5-10400f-2-9ghz-hasta-4-30-ghz-12mb-bx8070110400f-lga-1200-6-nucleos",
                                "https://www.impacto.com.pe/storage/products/md/173825982293231.webp",
                                "189.90",
                                Map.of(
                                                "Socket CPU", "LGA1200",
                                                "Núcleos CPU", "6",
                                                "Hilos CPU", "12",
                                                "Frecuencia Base CPU", "2.9 GHz",
                                                "Frecuencia Turbo CPU", "4.3 GHz",
                                                "Caché L3 CPU", "12 MB",
                                                "Consumo CPU", "65 W"));

                // ALMACENAMIENTO
                crearProductoConAtributos(
                                1,
                                "SSD Kingston NV2 1TB NVMe PCIe 4.0",
                                "Kingston",
                                "NV2",
                                "SSD NVMe PCIe 4.0 de 1TB...",
                                "Almacenamiento",
                                30,
                                "https://sercoplus.com/570-ssd-m-2-pcie",
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ7xZo_o7KIao65S6RUmmvR37WzHYhRKvFOw&s",
                                "249.90",
                                Map.of(
                                                "Tipo de Almacenamiento", "SSD NVMe",
                                                "Capacidad Almacenamiento", "1 TB",
                                                "Interfaz Almacenamiento", "PCIe 4.0 x4 NVMe",
                                                "Velocidad Lectura", "3500 MB/s",
                                                "Velocidad Escritura", "2100 MB/s",
                                                "Consumo Almacenamiento", "4.5 W"));

                crearProductoConAtributos(
                                2,
                                "SSD WD Blue SN570 250GB NVMe PCIe 3.0",

                                "Western Digital",
                                "Blue SN570",
                                "SSD NVMe de 250 GB ideal para builds económicas y rápidas.",
                                "Almacenamiento",
                                25,
                                "https://computershopperu.com/categoria/36-almacenamiento",
                                "https://cgs-computer.pe/public_html/public/img/productos/jCokfHiOE2efkP26F6fciVvmJRSPApg3bjtQSs3iVDqzysKccliwpxwDNblzU6aTrzCmLA4woY6auiOc.jpg",
                                "49.90",
                                Map.of(
                                                "Tipo de Almacenamiento", "SSD NVMe",
                                                "Capacidad Almacenamiento", "250 GB",
                                                "Interfaz Almacenamiento", "PCIe 3.0 x4 NVMe",
                                                "Velocidad Lectura", "3300 MB/s",
                                                "Velocidad Escritura", "1200 MB/s",
                                                "Consumo Almacenamiento", "3 W"));

                crearProductoConAtributos(
                                3,
                                "SSD Samsung 980 PRO 2TB NVMe PCIe 4.0",
                                "Samsung",
                                "980 PRO",
                                "SSD de alto rendimiento con velocidades extremas para gaming y productividad.",
                                "Almacenamiento",
                                20,
                                "https://www.impacto.com.pe/catalogo?qsearch=SSD%20Samsung%20980%20PRO%202TB%20NVMe%20PCIe%204.0",
                                "https://www.impacto.com.pe/storage/products/md/17382785007183.webp",

                                "499.90",
                                Map.of(
                                                "Tipo de Almacenamiento", "SSD NVMe",
                                                "Capacidad Almacenamiento", "2 TB",
                                                "Interfaz Almacenamiento", "PCIe 4.0 x4 NVMe",
                                                "Velocidad Lectura", "7000 MB/s",
                                                "Velocidad Escritura", "5100 MB/s",
                                                "Consumo Almacenamiento", "8 W"));

                crearProductoConAtributos(
                                1,
                                "SSD Crucial P3 500GB NVMe PCIe 3.0",

                                "Crucial",
                                "P3",
                                "SSD NVMe PCIe 3.0 económico con buen rendimiento para gaming y uso general.",
                                "Almacenamiento",
                                30,
                                "https://sercoplus.com/570-ssd-m-2-pcie",
                                "https://mercury.vtexassets.com/arquivos/ids/14642986/image-607980e266c14e92898ecc7b5913f845.jpg?v=638360940017830000",
                                "70.70",
                                Map.of(
                                                "Tipo de Almacenamiento", "SSD NVMe",
                                                "Capacidad Almacenamiento", "500 GB",
                                                "Interfaz Almacenamiento", "PCIe 3.0 x4 NVMe",
                                                "Velocidad Lectura", "3500 MB/s",
                                                "Velocidad Escritura", "1900 MB/s",
                                                "Consumo Almacenamiento", "3.5 W"));

                // FUENTE DE PODER
                crearProductoConAtributos(
                                2,
                                "Fuente de Poder Corsair RM750x 750W 80+ Gold Full Modular",

                                "Corsair",
                                "RM750x",
                                "Fuente de poder de 750W con certificación 80+ Gold, totalmente modular y silenciosa.",
                                "Fuente de Poder",
                                15,
                                "https://computershopperu.com/categoria/16-fuente-de-poder?order=product.price.asc&q=Marca-ASROCK-CORSAIR-COUGAR-MICRONICS-ANTRYX&page=2",
                                "https://www.impacto.com.pe/storage/products/lg/175640443480234.webp",
                                "129.90",
                                Map.of(
                                                "Potencia PSU", "750 W",
                                                "Certificación PSU", "80+ Gold",
                                                "Formato PSU", "ATX",
                                                "Modularidad PSU", "Full Modular",
                                                "Eficiencia PSU", "90%",
                                                "Consumo PSU", "750 W"));

                crearProductoConAtributos(
                                3,
                                "Fuente de Poder EVGA SuperNOVA 1000 G5 1000W 80+ Gold Full Modular",

                                "EVGA",
                                "SuperNOVA 1000 G5",
                                "Fuente de poder de 1000 W con certificación 80+ Gold, totalmente modular y eficiente.",
                                "Fuente de Poder",
                                20,
                                "https://www.impacto.com.pe/producto/fuente-de-poder-evga-1000w-g5-atx-nova-gold-80-plus-modular-color-negro-220-g5-1000-x1",
                                "https://www.impacto.com.pe/storage/products/md/16863493226204.jpg",
                                "179.90",
                                Map.of(
                                                "Potencia PSU", "1000 W",
                                                "Certificación PSU", "80+ Gold",
                                                "Formato PSU", "ATX",
                                                "Modularidad PSU", "Full Modular",
                                                "Eficiencia PSU", "90%",
                                                "Consumo PSU", "1000 W"));

                crearProductoConAtributos(
                                1,
                                "Fuente de Poder Cooler Master MWE 650 Bronze V2 650W",
                                "Cooler Master",
                                "MWE 650 Bronze V2",
                                "Fuente de poder eficiente y silenciosa, ideal para builds de gama media.",
                                "Fuente de Poder",
                                20,
                                "https://computershopperu.com/categoria/16-fuente-de-poder?order=product.price.desc&q=Marca-ANTEC-ASROCK-COOLER+MASTER-COUGAR-LIAN+LI/Disponibilidad-No+disponible&page=2",
                                "https://computershopperu.com/1760-home_default/fuente-de-poder-cooler-master-mwe-650-v2-650w-80-plus-bronze-.jpg",
                                "200.20",
                                Map.of(
                                                "Potencia PSU", "650 W",
                                                "Certificación PSU", "80+ Bronze",
                                                "Formato PSU", "ATX",
                                                "Modularidad PSU", "No Modular",
                                                "Eficiencia PSU", "85%",
                                                "Consumo PSU", "650 W"));

                crearProductoConAtributos(
                                2,
                                "Fuente de Poder EVGA 500 W1 500W 80+ White",
                                "EVGA",
                                "500 W1",
                                "Fuente de poder básica con certificación 80+ White, ideal para builds de entrada.",
                                "Fuente de Poder",
                                25,
                                "https://www.impacto.com.pe/producto/fuente-de-poder-evga-500w-atx-80-plus-white-no-modular-color-negro-100-w1-0500-kr",
                                "https://www.impacto.com.pe/storage/products/md/167450945014654.jpg",
                                "59.90",
                                Map.of(
                                                "Potencia PSU", "500 W",
                                                "Certificación PSU", "80+ White",
                                                "Formato PSU", "ATX",
                                                "Modularidad PSU", "No Modular",
                                                "Eficiencia PSU", "80%",
                                                "Consumo PSU", "500 W"));

                // REGRIGERACION
                crearProductoConAtributos(
                                3,
                                "Cooler CPU Cooler Master Hyper 212 Black Edition",

                                "Cooler Master",
                                "Hyper 212 Black Edition",
                                "Refrigeración por aire para CPU, diseño clásico con excelente rendimiento térmico y bajo ruido.",
                                "Refrigeración CPU",
                                30,
                                "https://www.impacto.com.pe/producto/cooler-para-procesador-cooler-master-hyper-212-rgb-black-edition-rr-212s-20pc-r2-negro",
                                "https://www.impacto.com.pe/storage/products/md/174429937484693.webp",
                                "49.90",
                                Map.of(
                                                "Tipo de Enfriamiento", "Aire",
                                                "Compatibilidad Socket Cooler", "Intel LGA1700, AM4",
                                                "Tamaño Ventilador", "120 mm",
                                                "Nivel de Ruido Cooler", "26 dBA",
                                                "ARGB Cooler", "No",
                                                "Consumo Cooler", "5 W"));

                crearProductoConAtributos(
                                1,
                                "Cooler CPU Cooler Master Hyper T20",

                                "Cooler Master",
                                "Hyper T20",
                                "Refrigeración por aire económica y compacta, ideal para procesadores de gama baja.",
                                "Refrigeración CPU",
                                40,
                                "https://sercoplus.com/270-cooler-de-procesadores",
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv_G112Tav_oZQUt9Vto5vUD8nklX9dGqnDg&s",
                                "29.90",
                                Map.of(
                                                "Tipo de Enfriamiento", "Aire",
                                                "Compatibilidad Socket Cooler", "Intel LGA115x, AM4",
                                                "Tamaño Ventilador", "92 mm",
                                                "Nivel de Ruido Cooler", "30 dBA",
                                                "ARGB Cooler", "No",
                                                "Consumo Cooler", "3 W"));

                crearProductoConAtributos(
                                2,
                                "Enfriamiento Líquido NZXT Kraken X63",

                                "NZXT",
                                "Kraken X63",
                                "Sistema de refrigeración líquida AIO con radiador de 280 mm y ventiladores RGB.",
                                "Refrigeración CPU",
                                12,
                                "https://computershopperu.com/categoria/17-refrigeracion-liquida",
                                "https://www.impacto.com.pe/storage/products/EH2COOHFDPLQWXQ1615568733RL-KRX63-01-1.jpg",
                                "149.90",
                                Map.of(
                                                "Tipo de Enfriamiento", "Líquido",
                                                "Compatibilidad Socket Cooler", "Intel LGA1700, AM4, AM5",
                                                "Tamaño Ventilador", "140 mm",
                                                "Nivel de Ruido Cooler", "21 dBA",
                                                "ARGB Cooler", "Sí",
                                                "Consumo Cooler", "12 W"));

                crearProductoConAtributos(
                                3,
                                "Cooler CPU DeepCool GAMMAXX 400 V2",

                                "DeepCool",
                                "GAMMAXX 400 V2",
                                "Enfriamiento por aire eficiente y económico compatible con múltiples sockets.",
                                "Refrigeración CPU",
                                35,
                                "https://www.impacto.com.pe/producto/cooler-para-procesador-deep-cool-gammaxx-400-v2-155x129x77mm-rodamiento-hidraulico-1-ventilador-iluminacion-led-rojo-dp-mch4-gmx400v2-rd",
                                "https://www.impacto.com.pe/storage/products/1619114594DP-MCH4-GMX400V2-RD--1.jpg",
                                "39.90",
                                Map.of(
                                                "Tipo de Enfriamiento", "Aire",
                                                "Compatibilidad Socket Cooler", "Intel LGA1700, AM4, AM5",
                                                "Tamaño Ventilador", "120 mm",
                                                "Nivel de Ruido Cooler", "27 dBA",
                                                "ARGB Cooler", "Sí",
                                                "Consumo Cooler", "4.5 W"));

                // MEMORIA
                crearProductoConAtributos(
                                1,
                                "Memoria RAM Corsair Vengeance RGB Pro 16GB (2x8GB) 3600MHz DDR4",

                                "Corsair",
                                "Vengeance RGB Pro",
                                "Kit de memoria RAM DDR4 de 16 GB (2 x 8 GB) a 3600 MHz, con iluminación RGB y perfil XMP 2.0.",
                                "Memoria RAM",
                                20,
                                "https://sercoplus.com/55-memorias-ram",
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-BmNYs4H1zTt0wWd4DuClGR8cj8RzJThynQ&s",
                                "79.90",
                                Map.of(
                                                "Tipo RAM", "DDR4",
                                                "Capacidad RAM", "16 GB (2x8)",
                                                "Frecuencia RAM", "3600 MHz",
                                                "Latencia CAS RAM", "18-22-22-42",
                                                "Perfil XMP RAM", "Sí",
                                                "Número de Módulos RAM", "2",
                                                "Consumo RAM", "10 W"));

                crearProductoConAtributos(
                                2,
                                "Memoria RAM G.Skill Ripjaws V 32GB (2x16GB) 3600MHz DDR4",

                                "G.Skill",
                                "Ripjaws V",
                                "Kit de RAM DDR4 de 32 GB (2 x 16 GB) a 3600 MHz, con bajo perfil y gran estabilidad.",
                                "Memoria RAM",
                                25,
                                "https://computershopperu.com/brand/52-gskill",
                                "https://www.impacto.com.pe/storage/products/lg/174239748099806.webp",
                                "149.90",
                                Map.of(
                                                "Tipo RAM", "DDR4",
                                                "Capacidad RAM", "32 GB (2x16)",
                                                "Frecuencia RAM", "3600 MHz",
                                                "Latencia CAS RAM", "18-22-22-42",
                                                "Perfil XMP RAM", "Sí",
                                                "Número de Módulos RAM", "2",
                                                "Consumo RAM", "15 W"));

                crearProductoConAtributos(
                                3,
                                "Memoria RAM ADATA XPG GAMMIX D30 16GB (2x8GB) 3200MHz DDR4",

                                "ADATA",
                                "GAMMIX D30",
                                "Kit de RAM DDR4 de 16 GB (2 x 8 GB) a 3200 MHz, confiable y económica.",
                                "Memoria RAM",
                                25,
                                "https://www.impacto.com.pe/catalogo?qsearch=Memoria%20RAM%20ADATA%20XPG%20GAMMIX%20D30%2016GB%20(2x8GB)%203200MHz%20DDR4",
                                "https://m.media-amazon.com/images/I/71aH6ETrwlL.jpg",
                                "149.90",
                                Map.of(
                                                "Tipo RAM", "DDR4",
                                                "Capacidad RAM", "16 GB (2x8)",
                                                "Frecuencia RAM", "3200 MHz",
                                                "Latencia CAS RAM", "16-20-20",
                                                "Perfil XMP RAM", "Sí",
                                                "Número de Módulos RAM", "2",
                                                "Consumo RAM", "8 W"));
        }

        private void crearProductoConAtributos(
                        long idTienda,
                        String nombre,
                        String modelo,
                        String marca,
                        String descripcion,
                        String categoria,
                        int stock,
                        String urlProducto,
                        String urlImagen,
                        String precio,
                        Map<String, String> atributos) {

                Producto producto = new Producto();
                producto.setNombre(nombre);
                producto.setModelo(modelo);
                producto.setMarca(marca);
                producto.setDescripcion(descripcion);
                producto.setCategoria(categoria);
                producto.setStock(stock);
                producto.setUrlProducto(urlProducto);
                producto.setUrlImagen(urlImagen);
                producto.setPrecio(new BigDecimal(precio));

                Tienda tienda = tiendaRepository.findById(idTienda)
                                .orElseThrow(() -> new RuntimeException(
                                                "Tienda con id " + idTienda + " no encontrada"));

                producto.setTienda(tienda);
                productoRepository.save(producto);

                atributos.forEach((nombreAtr, valor) -> crearProductoAtributo(producto, nombreAtr, valor));

        }

        private void crearProductoAtributo(Producto producto, String nombre, String valor) {

                Atributo atributo = atributoRepository.findByNombre(nombre)
                                .orElseThrow(() -> new RuntimeException(
                                                "No se encontro el atributo por nombre: " + nombre));

                ProductoAtributo pa = new ProductoAtributo();
                pa.setProducto(producto);
                pa.setAtributo(atributo);
                pa.setValor(valor);

                productoAtributoRepository.save(pa);
        }
}
