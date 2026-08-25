# Backend - Sistema de Reservas y Turnos (API REST + FileSystem)

Primera versión funcional del sistema backend para la gestión de turnos y reservas. El proyecto está construido con **Node.js** y **Express**, implementando una arquitectura de API REST. La persistencia de los datos se maneja mediante archivos JSON locales (FileSystem), permitiendo que la información de servicios y reservas se mantenga guardada al reiniciar el servidor.

## 🚀 Tecnologías utilizadas
* Node.js (Sintaxis ESM)
* Express.js
* Módulo nativo `fs/promises` y `crypto`
* Variables de entorno (`dotenv`)

## ⚙️ Instalación y Configuración

1. Clonar el repositorio.
2. Abrir la terminal en la carpeta del proyecto y ejecutar para instalar las dependencias:
   ```bash
   npm install
   ```
3. Crear un archivo `.env` en la raíz del proyecto basándose en `.env.example`. 
   * `PORT=8080`
   * `NODE_ENV=development`

## 🏃‍♂️ Cómo ejecutar el proyecto

Para levantar el servidor web, ejecutar el siguiente comando:
```bash
node src/server.js
```
El servidor indicará por consola que está escuchando en el puerto configurado (ej: `http://localhost:8080`).

---

## 📖 Documentación de la API

La API maneja dos recursos principales: **Servicios** (las prestaciones disponibles) y **Reservas** (los turnos tomados por los clientes).

### 🏷️ Recurso: Servicios (`/api/services`)

* **GET /api/services**
  * Devuelve todos los servicios.
  * *Filtros opcionales:* `?category=Salud` | `?available=true`
* **GET /api/services/:sid**
  * Devuelve un servicio específico por su ID.
* **POST /api/services**
  * Crea un nuevo servicio. El `id` se genera automáticamente.
  * **Body esperado:** `name`, `description`, `duration`, `price`, `category`, `available` (boolean).
* **PUT /api/services/:sid**
  * Actualiza los datos de un servicio. No permite modificar el `id`.
* **DELETE /api/services/:sid**
  * Elimina un servicio del sistema.

### 📅 Recurso: Reservas (`/api/bookings`)

* **POST /api/bookings**
  * Crea una reserva nueva. El array de servicios se inicializa vacío por defecto.
  * **Body esperado (JSON):**
    ```json
    {
      "clientName": "Nombre del Cliente",
      "clientEmail": "cliente@email.com",
      "date": "2026-10-15",
      "time": "18:00"
    }
    ```
* **GET /api/bookings/:bid**
  * Devuelve una reserva específica por su ID, incluyendo los servicios que el cliente haya agregado.
* **POST /api/bookings/:bid/services/:sid**
  * Vincula un servicio existente a una reserva existente. 
  * *Nota de comportamiento:* Si el servicio no estaba en la reserva, lo agrega con `quantity: 1`. Si ya existía, incrementa su cantidad.