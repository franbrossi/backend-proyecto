import { ServiceModel } from './models/service.model.js';

export const getAll = async () => {
  return await ServiceModel.find();
};

export const getById = async (id) => {
  return await ServiceModel.findById(id);
};

export const create = async (serviceData) => {
  return await ServiceModel.create(serviceData);
};

export const update = async (id, serviceData) => {
  return await ServiceModel.findByIdAndUpdate(id, serviceData, { new: true });
};

export const deleteService = async (id) => {
  return await ServiceModel.findByIdAndDelete(id);
};