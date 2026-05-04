/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import dotenv from 'dotenv';

import productRouter from './routes/product';
import orderRouter from './routes/order';

import errorHandler from './middlewares/error-handler';
import { errorLogger, requestLogger } from './middlewares/logger';

import { NotFoundError } from './errors-types/not-found-error';

dotenv.config();
const app = express();

const PORT = Number(process.env.PORT) || 3000;
const DB_ADDRESS = process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek';

// Тк public хранится на уровень выше
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(errors());

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Page not found'));
});

app.use(errorLogger);

app.use(errorHandler);

mongoose.connect(DB_ADDRESS);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}`);
});
