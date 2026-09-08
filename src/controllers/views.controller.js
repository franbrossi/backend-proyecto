import * as servicesService from '../services/services.service.js';
import * as bookingsService from '../services/bookings.service.js';

export const renderServices = async (req, res) => {
  try {
    const services = await servicesService.getServices();
    
    const plainServices = services.map(service => 
      service.toObject ? service.toObject() : service
    );

    res.render('services', { 
      services: plainServices 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar la vista de servicios');
  }
};

export const renderBookings = async (req, res) => {
  try {
    
    const bookings = await bookingsService.getAll();
    const plainBookings = bookings.map(booking => 
      booking.toObject ? booking.toObject() : booking
    );

    res.render('bookings', { 
      bookings: plainBookings 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar la vista de reservas');
  }
};