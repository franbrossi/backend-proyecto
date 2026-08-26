import * as bookingsRepository from '../repositories/bookings.repository.js';
import * as servicesService from './services.service.js'; 

export const createBooking = async (bookingData) => {
  return await bookingsRepository.create(bookingData);
};

export const getBookingById = async (id) => {
  return await bookingsRepository.getById(id);
};

export const addServiceToBooking = async (bid, sid) => {
  const serviceExists = await servicesService.getServiceById(sid);
  if (!serviceExists) {
    throw new Error('SERVICE_NOT_FOUND');
  }

  const booking = await bookingsRepository.getById(bid);
  if (!booking) {
    throw new Error('BOOKING_NOT_FOUND');
  }

  const serviceIndex = booking.services.findIndex(s => s.service === sid);
  if (serviceIndex !== -1) {
    booking.services[serviceIndex].quantity += 1;
  } else {
    booking.services.push({ service: sid, quantity: 1 });
  }

  return await bookingsRepository.update(bid, booking);
};