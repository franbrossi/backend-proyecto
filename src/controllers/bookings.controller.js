import * as bookingsService from '../services/bookings.service.js';

export const createBooking = async (req, res) => {
  try {
    const newBooking = await bookingsService.createBooking(req.body);
    const io = req.app.get('socketio');
    io.emit('nuevaReserva');
    res.status(201).json({ status: 'success', payload: newBooking });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await bookingsService.getBookingById(req.params.bid);
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
    const updatedBooking = await bookingsService.addServiceToBooking(bid, sid);
    const io = req.app.get('socketio');
    io.emit('reservaActualizada');
    res.status(200).json({ status: 'success', payload: updatedBooking });
  } catch (error) {
    if (error.message === 'SERVICE_NOT_FOUND') {
      return res.status(404).json({ status: 'error', message: 'El servicio que intenta agregar no existe' });
    }
    if (error.message === 'BOOKING_NOT_FOUND') {
      return res.status(404).json({ status: 'error', message: 'La reserva no existe' });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getBookings = async (req, res) => {
    try {
        const bookings = await bookingsService.getAll();
        res.status(200).json({ status: 'success', payload: bookings });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};