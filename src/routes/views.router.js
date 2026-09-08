import { Router } from 'express';
import * as viewsController from '../controllers/views.controller.js';

const router = Router();
router.get('/services', viewsController.renderServices);
router.get('/bookings', viewsController.renderBookings);

export default router;