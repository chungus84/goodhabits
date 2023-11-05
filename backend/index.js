import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import main from './src/db/main.js';

import { router as habitRouter } from './src/routes/habits.routes.js';

const app = express();

dotenv.config({ path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}` })
const HOST = process.env.HOST;
const PORT = process.env.PORT;


app.use(cors());
app.use(bodyParser.json());
app.use('/', habitRouter);


main();

const server = app.listen(PORT, HOST, () => {
    console.log(`Server is listening at http://${HOST}:${PORT}`);
});

export default server;
