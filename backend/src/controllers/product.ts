/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/product';

import { BadRequestError } from '../errors-types/bad-request-error';
import { ConflictError } from '../errors-types/conflict-error';

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  Product.find({})
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      next(err);
    });
};

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const {
    title, image, category, description, price,
  } = req.body;
  Product.create({
    title,
    image,
    category,
    description,
    price,
  })
    .then((product) => {
      res.status(201).send(product);
    })
    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) {
        return next(new BadRequestError('Ошибка валидации данных при создании товара'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Товар с таким title уже существует'));
      }
      return next(err);
    });
};
