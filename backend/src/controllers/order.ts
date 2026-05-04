import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import { IOrder } from '../middlewares/validations';
import { BadRequestError } from '../errors-types/bad-request-error';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
// используем dynamic import, так как @faker-js/faker — ESM-модуль
// и не работает с CommonJS (require)
  const { faker } = await import('@faker-js/faker');
  try {
    const data: IOrder = req.body;
    const products = await Product.find({
      _id: { $in: data.items },
    });

    if (products.length !== data.items.length) {
      return next(new BadRequestError('Ошибка валидации данных при создании заказа'));
    }

    if (products.some((p) => p.price === null)) {
      return next(new BadRequestError('Ошибка валидации данных при создании заказа'));
    }
    const fullDBPrice = products.reduce((result, curr) => result + (curr.price ?? 0), 0);
    if (fullDBPrice !== data.total) {
      return next(new BadRequestError('Ошибка валидации данных при создании заказа'));
    }
    return res.status(200).send({
      id: faker.string.uuid(),
      total: fullDBPrice,
    });
  } catch (err) {
    return next(err);
  }
};

export default createOrder;
