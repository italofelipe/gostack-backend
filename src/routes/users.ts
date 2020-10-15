import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();
    await createUser.execute({
      name,
      email,
      password,
    });

    const secureUser = { name, email };
    return res.status(201).json(secureUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default usersRouter;
