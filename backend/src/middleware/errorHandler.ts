import { Request, Response, NextFunction } from 'express';
import { ENV } from '../config/env';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(`[SafeHire API Error] ${req.method} ${req.url}:`, err);

  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(ENV.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
};
