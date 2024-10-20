import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import globalErrorHandler from './middlewares/globalErrorhandler';


const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes


app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

app.use(globalErrorHandler);

const getAController = (req: Request, res: Response) => {
  res.send('Hello World');
};

app.get('/', getAController);

export default app;
