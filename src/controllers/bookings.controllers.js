import { BookingManager } from '../managers/BookingManager.js';
import { ServiceManager } from '../managers/ServiceManager.js';

const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();

export const createBooking = async (req, res) => {
  try {
    const newBooking = await bookingManager.createBooking(req.body);
    res.status(201).json({ status: 'success', payload: newBooking });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await bookingManager.getBookingById(req.params.bid);
    if (!booking) {
      return res.status(404).json({ status: 'error', message: 'Reserva no encontrada' });
    }
    res.status(200).json({ status: 'success', payload: booking });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const addServiceToBooking = async (req, res) => {
  try {
    const { bid, sid } = req.params;
    const serviceExists = await serviceManager.getServiceById(sid);
    if (!serviceExists) {
      return res.status(404).json({ status: 'error', message: 'El servicio que intenta agregar no existe' });
    }

   
    const updatedBooking = await bookingManager.addServiceToBooking(bid, sid);
    if (!updatedBooking) {
      return res.status(404).json({ status: 'error', message: 'La reserva no existe' });
    }

    res.status(200).json({ status: 'success', payload: updatedBooking });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};