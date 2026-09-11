import { Router } from 'express';
import * as bookingsController from '../controllers/bookings.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createBookingSchema } from '../validations/booking.schema.js';

const router = Router();
router.get('/', bookingsController.getBookings);
router.post('/', validate(createBookingSchema), bookingsController.createBooking);
router.get('/:bid', bookingsController.getBookingById);
router.post('/:bid/services/:sid', bookingsController.addServiceToBooking);

export default router;