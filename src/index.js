import express, { Router } from 'express';
import cors from 'cors';
import pollRouter from './routes/pollRouters.js'
import choiceRouter from './routes/choiceRoutes.js'
import dotenv from 'dotenv';
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());
app.use(pollRouter);
app.use(choiceRouter);


const port = process.env.PORT || 5000;
app.listen(port);