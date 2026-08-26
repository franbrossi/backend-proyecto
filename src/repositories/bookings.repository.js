import * as bookingsDao from '../dao/bookings.dao.js';

export const getById = async (id) => await bookingsDao.getById(id);
export const create = async (data) => await bookingsDao.create(data);
export const update = async (id, data) => await bookingsDao.update(id, data);