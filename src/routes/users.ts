import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';

import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import veirfyAuth from '../middlewares/verifyAuth';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  const createUser = new CreateUserService();
  await createUser.execute({
    name,
    email,
    password,
  });

  const secureUser = { name, email };
  return res.status(201).json(secureUser);
});

usersRouter.patch(
  '/avatar',
  veirfyAuth,
  upload.single('avatar'),
  async (req, res) => {
    const updateAvatar = new UpdateUserAvatarService();
    const user = await updateAvatar.execute({
      user_id: req.user.id,
      filename: req.file.filename,
    });
    const secureUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    return res.status(200).json(secureUser);
  },
);
export default usersRouter;
