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

export const getPaginatedServices = async (filter = {}, options = {}) => {
    const skip = (options.page - 1) * options.limit;
    let sortOption = {};
    if (options.sortBy) {
        sortOption[options.sortBy] = options.order === 'desc' ? -1 : 1;
    }

    const services = await ServiceModel.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(options.limit);

    const totalDocs = await ServiceModel.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / options.limit);

    return {
        docs: services,
        totalPages,
        totalDocs,
        page: options.page,
        limit: options.limit,
        hasPrevPage: options.page > 1,
        hasNextPage: options.page < totalPages,
        prevPage: options.page > 1 ? options.page - 1 : null,
        nextPage: options.page < totalPages ? options.page + 1 : null
    };
};