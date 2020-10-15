import { Router } from 'express';
import appointmentsRouter from './appointments';
import usersRouter from './users';
import authRouter from './auth';

const routes = Router();
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/auth', authRouter);

export default routes;
