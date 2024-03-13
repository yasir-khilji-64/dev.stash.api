import { NextFunction, Request, Response } from 'express';

import { config } from '../utils/config';
import { ErrorResponse } from '../interfaces/error-response.interface';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(422);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: Error,
  _: Request,
  res: Response<ErrorResponse>,
  __: NextFunction,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: err.message,
    stack: config.get('NODE_ENV') === 'prod' ? '🥞' : err.stack,
  });
}
