import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { SignInRequest } from '../types/index';
import User from '../models/User';

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: SignInRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email address already used');
    }

    const hashedPassword = await hash(password, 10);
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
