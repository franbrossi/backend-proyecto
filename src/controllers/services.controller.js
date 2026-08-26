import * as servicesService from '../services/services.service.js';

export const getServices = async (req, res) => {
  try {
    const { category, available } = req.query;
    const services = await servicesService.getServices(category, available);
    res.status(200).json({ status: 'success', payload: services });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await servicesService.getServiceById(req.params.sid);
    if (!service) return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    res.status(200).json({ status: 'success', payload: service });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const newService = await servicesService.createService(req.body);
    res.status(201).json({ status: 'success', payload: newService });
  } catch (error) {
    if (error.message.includes('Faltan campos')) return res.status(400).json({ status: 'error', message: error.message });
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const updatedService = await servicesService.updateService(req.params.sid, req.body);
    if (!updatedService) return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    res.status(200).json({ status: 'success', payload: updatedService });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const deletedService = await servicesService.deleteService(req.params.sid);
    if (!deletedService) return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    res.status(200).json({ status: 'success', payload: deletedService });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};