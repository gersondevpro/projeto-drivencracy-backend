import express, { Router } from 'express';
import cors from 'cors';
import pollRouter from './routes/pollRouters.js'
import choiceRouter from './routes/choiceRoutes.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(pollRouter);
app.use(choiceRouter);

app.listen(5000);