import * as messagesService from '../services/messages.service.js';

export const getMessages = async (req, res) => {
    try {
        const messages = await messagesService.getAll();
        res.json({ status: "success", payload: messages });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

export const createMessage = async (req, res) => {
    try {
        const newMessage = await messagesService.create(req.body);
        res.status(201).json({ status: "success", payload: newMessage });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};