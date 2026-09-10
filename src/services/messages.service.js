import * as messagesRepository from '../repositories/messages.repository.js';

export const getAll = async () => {
    return await messagesRepository.getAll();
};

export const create = async (messageData) => {
    return await messagesRepository.create(messageData);
};