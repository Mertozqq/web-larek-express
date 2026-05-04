import { Joi } from 'celebrate';

enum paymentMethods {
  'card',
  'online'
}

export interface IOrder {
  items: string[],
  total: number,
  payment: paymentMethods
  email: string,
  phone: string,
  address: string
}

export const orderSchema = Joi.object({
  items: Joi.array().items(Joi.string()).min(1).required(),
  total: Joi.number().required(),
  payment: Joi.string().valid('card', 'online').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
});
