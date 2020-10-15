import 'reflect-metadata';
import colors from 'colors';
import express from 'express';
import routes from './routes';
import './database';

const app = express();
app.use(express.json());
app.use(routes);

app.listen(5000, () => {
  console.log(colors.green.bold.inverse('Server started at port 4000'));
});
