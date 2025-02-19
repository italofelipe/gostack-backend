import 'reflect-metadata';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import colors from 'colors';

import uploadConfig from './config/upload';
import routes from './routes';
import AppError from './errors/AppError';
import './database';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use((err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});
app.listen(5000, () => {
  console.log(colors.green.bold.inverse('Server started at port 5000'));
});
