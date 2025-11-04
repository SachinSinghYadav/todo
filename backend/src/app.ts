import express from 'express';

import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/todo.routes';

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config({ quiet: true });

const apiPrefix = process.env.API_PREFIX || '/';

app.use(apiPrefix, routes);

export default app;
