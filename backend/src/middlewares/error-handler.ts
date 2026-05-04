/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response, Request } from 'express';
import { BadRequestError } from '../errors-types/bad-request-error';
import { ConflictError } from '../errors-types/conflict-error';
import { NotFoundError } from '../errors-types/not-found-error';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof BadRequestError
    || err instanceof ConflictError || err instanceof NotFoundError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }

  return res.status(500).send({
    message: 'Internal Server Error',
  });
};

export default errorHandler;
