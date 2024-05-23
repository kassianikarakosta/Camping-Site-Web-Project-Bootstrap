import { Router } from 'express';
import { checkAvailability } from '../controller/availabilityController.mjs';

const router = Router();

router.post('/availability', checkAvailability);

export default router;