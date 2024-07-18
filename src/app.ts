import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/Product/product.route';
import { CategoryRoutes } from './app/modules/Category/category.route';
import session from 'express-session';
import { CartRoutes } from './app/modules/Cart/cart.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { OrderRoutes } from './app/modules/Order/order.route';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/', ProductRoutes);
app.use('/', CategoryRoutes);
app.use('/', CartRoutes);
app.use('/', OrderRoutes);


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
