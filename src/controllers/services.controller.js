import { ServiceManager } from '../managers/ServiceManager.js';

const manager = new ServiceManager();

export const getServices = async (req, res) => {
  try {
    let services = await manager.getServices();
    const { category, available } = req.query;

    if (category) services = services.filter(s => s.category.toLowerCase() === category.toLowerCase());
    if (available) {
      const isAvailable = available === 'true';
      services = services.filter(s => s.available === isAvailable);
    }
    res.status(200).json({ status: 'success', payload: services });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await manager.getServiceById(req.params.sid);
    if (!service) return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    res.status(200).json({ status: 'success', payload: service });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const newService = await manager.addService(req.body);
    res.status(201).json({ status: 'success', payload: newService });
  } catch (error) {
    if (error.message.includes('Faltan campos')) return res.status(400).json({ status: 'error', message: error.message });
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const updatedService = await manager.updateService(req.params.sid, req.body);
    if (!updatedService) return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    res.status(200).json({ status: 'success', payload: updatedService });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const deletedService = await manager.deleteService(req.params.sid);
    if (!deletedService) return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    res.status(200).json({ status: 'success', payload: deletedService });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};