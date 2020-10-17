import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authconfig from '../config/auth';
import { TokenPayload } from '../types/index';
import AppError from '../errors/AppError';

function verifyAuth(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { secret } = authconfig.jwt;
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('JWT Token is missing', 401);
  }
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, secret);
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}

export default verifyAuth;
