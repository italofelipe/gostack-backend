import { Router } from 'express';

import AuthUserService from '../services/AuthUserService';

const authRouter = Router();

authRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const authService = new AuthUserService();

  const { user: userData, token } = await authService.execute({
    email,
    password,
  });
  const { email: userEmail, id: userId, name: userName } = userData;

  return res
    .status(200)
    .json({ user: { email: userEmail, id: userId, name: userName }, token });
});

export default authRouter;
