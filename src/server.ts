import express from 'express';
import routes from './routes';

const app = express();

app.get('/', (req, res, next) =>
    res.json({ message: 'Hello Go Stack Boilerplate' }),
);

app.listen(4000, () => {
    console.log('Server started at port 4000');
});
