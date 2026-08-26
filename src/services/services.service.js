import * as servicesRepository from '../repositories/services.repository.js';

export const getServices = async (category, available) => {
  let services = await servicesRepository.getAll();
  if (category) {
    services = services.filter(s => s.category.toLowerCase() === category.toLowerCase());
  }
  if (available !== undefined) {
    const isAvailable = available === 'true';
    services = services.filter(s => s.available === isAvailable);
  }
  
  return services;
};

export const getServiceById = async (id) => await servicesRepository.getById(id);

export const createService = async (serviceData) => {
  if (!serviceData.name || !serviceData.price) {
    throw new Error('Faltan campos obligatorios');
  }
  return await servicesRepository.create(serviceData);
};

export const updateService = async (id, serviceData) => await servicesRepository.update(id, serviceData);

export const deleteService = async (id) => await servicesRepository.deleteItem(id);