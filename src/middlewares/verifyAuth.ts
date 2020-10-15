import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authconfig from '../config/auth';
import { TokenPayload } from '../types/index';

function verifyAuth(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { secret } = authconfig.jwt;
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error('JWT Token is missing');
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
    throw new Error('Invalid JWT Token');
  }
}

export default verifyAuth;
