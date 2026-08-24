
import { config } from './config/env.config.js';
import { ServiceManager } from './managers/ServiceManager.js';

const testManager = async () => {
  console.log(`🚀 Iniciando sistema en modo: ${config.nodeEnv} | Puerto: ${config.port}`);
  
  const manager = new ServiceManager();

  console.log("\n--- 1. Agregando servicios de reserva ---");
  try {
    const servicio1 = await manager.addService({
      name: "Corte de pelo clásico",
      description: "Corte tradicional a tijera o máquina. Incluye lavado.",
      duration: 30, 
      price: 8500,
      category: "Peluquería",
      available: true
    });
    console.log("✅ Servicio agregado:", servicio1.id);

    const servicio2 = await manager.addService({
      name: "Masaje Descontracturante",
      description: "Sesión de 60 minutos de masajes de tejido profundo.",
      duration: 60,
      price: 15000,
      category: "Bienestar",
      available: true
    });
    console.log("✅ Servicio agregado:", servicio2.id);
  } catch (error) {
    console.error("❌ Error al agregar:", error.message);
  }

  console.log("\n--- 2. Obteniendo todos los servicios ---");
  const todosLosServicios = await manager.getServices();
  console.log("Total de servicios disponibles para reservar:", todosLosServicios.length);

 
  if (todosLosServicios.length > 0) {
    const idPrueba = todosLosServicios[0].id;

    console.log("\n--- 3. Obteniendo un servicio por ID ---");
    const servicioEncontrado = await manager.getServiceById(idPrueba);
    console.log("Encontrado:", servicioEncontrado.name);

    console.log("\n--- 4. Actualizando un servicio (ej: cambio de precio) ---");
    const actualizado = await manager.updateService(idPrueba, { price: 9500 });
    console.log("Precio actualizado a:", actualizado.price);

    console.log("\n--- 5. Eliminando un servicio ---");
    
  }
};


testManager();