# 🖥️ CompuSearch

CompuSearch es una plataforma web peruana especializada en la **comparación de componentes de PC**, creada por estudiantes de la **Universidad Tecnológica del Perú**.

---

## 📖 Información general del proyecto

| Tema            | Detalle                                                                                                                                      |
|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| **Propósito**   | Facilitar la búsqueda, comparación y selección de hardware, conectando usuarios con las principales tiendas tecnológicas del Perú.            |
| **Enfoque**     | Decisiones informadas según prioridades de **precio, calidad y seguridad**.                                                                  |
| **Universidad** | Universidad Tecnológica del Perú                                                                                                             |
| **Curso**       | Integrador I: Sistemas Software                                                                                                              |

---

## 🏢 Historia y visión

CompuSearch nace en 2025 como un **proyecto universitario**, con la misión de **potenciar el comercio electrónico de hardware en Perú** mediante una herramienta web transparente, accesible y completa.

La plataforma busca convertirse en el **referente nacional** para la comparación de componentes de computadoras, impulsando el ecosistema tecnológico local y ofreciendo una experiencia de usuario moderna, intuitiva y confiable.

---

## 🎯 Características principales

| Característica                         | Descripción                                                                                     |
|-----------------------------------------|-------------------------------------------------------------------------------------------------|
| Comparación de productos                | Múltiples tiendas en tiempo real                                                                |
| Filtros avanzados                       | Por categoría, marca, precio, disponibilidad y tienda                                           |
| Configurador de builds                  | Validación de compatibilidad de componentes                                                     |
| Panel administrativo                    | Gestión de productos, tiendas y usuarios                                                        |
| Módulo de reportes y analítica          | Métricas de ventas y catálogo                                                                   |
| Integración con pasarela de pagos        | Suscripciones de tiendas                                                                       |
| Seguridad y protección de datos         | Cumplimiento de normativas locales                                                              |

---

## 📦 Estructura general del proyecto

```
CompuSearch/
│
├── Backend/    # Lógica de negocio, API y base de datos (Spring Boot)
├── Frontend/   # Interfaz de usuario y lógica cliente (Vite + React)
└── README.md   # Este archivo principal
```

---

## 🚀 Ejecución del Proyecto (Recomendado)

La forma más rápida y segura de ejecutar todo el ecosistema de CompuSearch es utilizando **Docker Compose**.

### 1. Requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y en ejecución.

### 2. Pasos para iniciar
Desde la raíz del proyecto, ejecuta:
```bash
docker-compose up --build -d
```

### 3. Accesos y Credenciales
| Servicio | URL | Credenciales |
| :--- | :--- | :--- |
| **Frontend** | [http://localhost:3000](http://localhost:3000) | - |
| **Backend API** | [http://localhost:8080](http://localhost:8080) | - |
| **Simulador API** | [http://localhost:8081](http://localhost:8081) | - |
| **Grafana** | [http://localhost:3001](http://localhost:3001) | `admin` / `admin` |

**Cuentas de prueba pre-configuradas:**
- **Administrador (Empleado):** `admin` / `Admin123!`
- **Tienda (Pruebas API):** `tienda` / `Tienda123!`

---

## 🧪 Flujo de Prueba de API
Para probar la carga de productos desde el simulador:
1. Inicia sesión como **Tienda**.
2. Ve a la sección **API** en el panel lateral.
3. Asegura que la URL sea: `http://api.tiendaA.com` (o usa B/C).
4. Dale a **Probar conexión**.
5. Ve a **Mis Productos** y pulsa el botón de sincronización.

---

## 🛠️ Implementación Local (Opcional)
Si deseas ejecutar los módulos por separado sin Docker:
1. **Frontend**: Consulta el [README de Frontend](./Frontend/README.md).
2. **Backend**: Consulta el [README de Backend](./Backend/README.md).

---

## 🧩 Descripción breve de los módulos

| Módulo        | Tecnologías clave                     | Descripción                                                                                  | Más información        |
|---------------|---------------------------------------|----------------------------------------------------------------------------------------------|------------------------|
| **Backend**   | Spring Boot, Java, MySQL              | API REST segura, lógica de negocio y persistencia de datos                                   | [Ver README](./Backend/README.md) |
| **Frontend**  | Vite, React, JavaScript, Bootstrap    | Interfaz web moderna, dinámica y responsiva                                                  | [Ver README](./Frontend/README.md) |
| **Admin Web** | Incluido en Backend y Frontend        | Panel de administración para gestión de tiendas, usuarios, productos y generación de reportes | Incluido en Back/Front |

---

## 📌 Alcance del proyecto

| Rol               | Funcionalidades principales                                                                                |
|-------------------|----------------------------------------------------------------------------------------------------------|
| **Usuarios**      | Búsqueda, filtrado, comparación y armado de builds                                                        |
| **Tiendas**       | Autogestión de catálogo, precios y stock                                                                  |
| **Administradores** | Supervisión de usuarios, tiendas, incidencias y métricas                                               |
| **Reportes**      | Exportación en PDF/Excel y visualización en dashboard                                                     |
| **Seguridad**     | Autenticación con JWT, control de roles y cifrado de datos sensibles                                      |

---

## 👥 Autores

- [Leonardo Beraun](https://github.com/Estudiante-leonardo)
- [Edhu Macedo](https://github.com/EdhuMS)
- [Jesús Matos](https://github.com/MatosChuquinoJesusPresencio)
- [Edu Morales](https://github.com/EduMoralesCar)  
- [Jeremi Olivares](https://github.com/JeremiAlex04)

---
