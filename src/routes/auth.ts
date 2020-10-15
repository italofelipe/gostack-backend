import { id } from 'date-fns/locale';
import { Router } from 'express';

import AuthUserService from '../services/AuthUserService';

const authRouter = Router();

authRouter.post('/', async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default authRouter;
