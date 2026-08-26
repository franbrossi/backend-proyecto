import * as servicesDao from '../dao/services.dao.js';

export const getAll = async () => await servicesDao.getAll();
export const getById = async (id) => await servicesDao.getById(id);
export const create = async (data) => await servicesDao.create(data);
export const update = async (id, data) => await servicesDao.update(id, data);
export const deleteItem = async (id) => await servicesDao.deleteItem(id);