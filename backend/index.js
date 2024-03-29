import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import main from './src/db/main.js';

import { router as habitRouter } from './src/routes/habits.routes.js';
import { router as eventRouter } from './src/routes/events.router.js'
import { router as profileRouter } from './src/routes/profile.routes.js';

const app = express();

dotenv.config({ path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}` })
const HOST = process.env.HOST;
const PORT = process.env.PORT;


app.use(cors());
app.use(bodyParser.json());
app.use('/', habitRouter);
app.use('/profile', profileRouter);
app.use('/habits', eventRouter);



main();

const server = app.listen(PORT, HOST, () => {
    console.log(`Server is listening at http://${HOST}:${PORT}`);
});

export default server;
