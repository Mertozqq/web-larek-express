import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import createOrder from '../controllers/order';
import { orderSchema } from '../middlewares/validations';

const router = Router();

router.post('/', celebrate({
  [Segments.BODY]: orderSchema,
}), createOrder);

export default router;
