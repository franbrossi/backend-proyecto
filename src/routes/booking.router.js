import { Router } from 'express';
import * as bookingsController from '../controllers/bookings.controller.js';

const router = Router();

router.post('/', bookingsController.createBooking);
router.get('/:bid', bookingsController.getBookingById);
router.post('/:bid/services/:sid', bookingsController.addServiceToBooking);

export default router;