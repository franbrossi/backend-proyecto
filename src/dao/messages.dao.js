import { MessageModel } from './models/message.model.js';

export const getAll = async () => {
    return await MessageModel.find().lean();
};

export const create = async (messageData) => {
    return await MessageModel.create(messageData);
};