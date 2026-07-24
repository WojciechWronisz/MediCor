import { Router } from 'express';
import {
  getDoctors,
  getDoctorAvailability,
  getServices,
  createAppointment,
  getAppointment,
} from '../controllers/clinicController.js';

const router = Router();

router.get('/doctors', getDoctors);
router.get('/doctors/:id/availability', getDoctorAvailability);
router.get('/services', getServices);
router.post('/appointments', createAppointment);
router.get('/appointments/:id', getAppointment);

export default router;
