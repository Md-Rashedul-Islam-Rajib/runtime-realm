import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import { handleErrors } from './app/utilities/handleErrors';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use('/', router);

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello from Runtime Realm');
});

app.use(handleErrors);
export default app;