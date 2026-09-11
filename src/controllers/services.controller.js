import * as servicesService from '../services/services.service.js';

export const getServices = async (req, res) => {
    try {
        const { category, available, page, limit, sortBy, order } = req.query;

        const filter = {};
        if (category) filter.category = category;
        if (available !== undefined) {
            filter.available = available === 'true'; 
        }
        const options = {
            page: page ? parseInt(page) : 1,
            limit: limit ? parseInt(limit) : 10,
            sortBy: sortBy || 'price', 
            order: order || 'asc'
        };

        const result = await servicesService.getPaginatedServices(filter, options);
        res.status(200).json({
            status: 'success',
            payload: result.docs,
            totalDocs: result.totalDocs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage
        });
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
    const io = req.app.get('socketio');
    io.emit('nuevoServicio', newService);
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
    const io = req.app.get('socketio');
    io.emit('servicioActualizado');
    res.status(200).json({ status: 'success', payload: updatedService });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const deletedService = await servicesService.deleteService(req.params.sid);
    if (!deletedService) return res.status(404).json({ status: 'error', message: 'Servicio no encontrado' });
    const io = req.app.get('socketio');
    io.emit('servicioEliminado', req.params.sid);
    res.status(200).json({ status: 'success', payload: deletedService });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};