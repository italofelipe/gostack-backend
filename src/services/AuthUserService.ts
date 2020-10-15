import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { LoginRequest, UserTypes } from '../types/index';
import User from '../models/User';
import authConfig from '../config/auth';

class AuthUserService {
  public async execute({ email, password }: LoginRequest): Promise<UserTypes> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Email/Password incorrect. Try again');
    }
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Email/Password incorrect. Try again');
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return {
      user,
      token,
    };
  }
}

export default AuthUserService;
