import { Router } from 'express';
import * as messagesController from '../controllers/messages.controller.js';

const router = Router();

router.get('/', messagesController.getMessages);
router.post('/', messagesController.createMessage);

export default router;