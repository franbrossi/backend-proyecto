import * as messagesDao from '../dao/messages.dao.js';

export const getAll = async () => {
    return await messagesDao.getAll();
};

export const create = async (messageData) => {
    return await messagesDao.create(messageData);
};