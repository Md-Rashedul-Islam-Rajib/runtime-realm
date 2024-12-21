import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './app/routes';
import { handleErrors } from './app/utilities/handleErrors';

// import "./index.d";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello from Runtime Realm');
});

app.use(handleErrors);
export default app;
