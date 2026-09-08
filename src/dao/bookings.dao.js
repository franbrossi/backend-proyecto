import { BookingModel } from './models/booking.model.js';

export const getById = async (id) => {
  return await BookingModel.findById(id).populate('services.service');
};

export const create = async (bookingData) => {
  return await BookingModel.create(bookingData);
};

export const update = async (id, bookingData) => {
  return await BookingModel.findByIdAndUpdate(id, bookingData, { new: true });
};