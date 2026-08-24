import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto'; 


const dataPath = path.resolve('src/data/services.json');

export class ServiceManager {
  
  
  
  async #readFile() {
    try {
      const data = await fs.readFile(dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      
      if (error.code === 'ENOENT') {
        return [];
      }
      throw new Error('Error al leer la base de datos de servicios');
    }
  }

  async #writeFile(data) {
   
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8');
  }

 

  
  async getServices() {
    return await this.#readFile();
  }

  
  async getServiceById(id) {
    const services = await this.#readFile();
    const service = services.find(s => s.id === id);
    return service || null; 
  }

  
  async addService(serviceData) {
    const { name, description, duration, price, category, available } = serviceData;

    
    if (!name || !description || !duration || !price || !category || available === undefined) {
      throw new Error('Faltan campos obligatorios para crear el servicio');
    }

    const services = await this.#readFile();

    
    const newService = {
      id: crypto.randomUUID(), 
      name,
      description,
      duration,
      price,
      category,
      available
    };

    services.push(newService);
    await this.#writeFile(services);

    return newService;
  }

  
  async updateService(id, updatedData) {
    const services = await this.#readFile();
    const index = services.findIndex(s => s.id === id);

    if (index === -1) {
      return null; 
    }

    
    const { id: _, ...dataToUpdate } = updatedData;

    services[index] = {
      ...services[index],
      ...dataToUpdate,
      id 
    };

    await this.#writeFile(services);
    return services[index];
  }

  
  async deleteService(id) {
    const services = await this.#readFile();
    const index = services.findIndex(s => s.id === id);

    if (index === -1) {
      return null; 
    }

    const [deletedService] = services.splice(index, 1); 
    await this.#writeFile(services);
    
    return deletedService;
  }
}