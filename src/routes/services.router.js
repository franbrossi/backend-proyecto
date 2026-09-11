import { Router } from 'express';
import * as servicesController from '../controllers/services.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createServiceSchema, updateServiceSchema } from '../validations/service.schema.js';
const router = Router();

router.get('/', servicesController.getServices);
router.get('/:sid', servicesController.getServiceById);
router.post('/', validate(createServiceSchema), servicesController.createService);
router.put('/:sid', validate(updateServiceSchema), servicesController.updateService);
router.delete('/:sid', servicesController.deleteService);

export default router;