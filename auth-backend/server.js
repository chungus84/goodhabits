import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'

import main from './src/db/main.js'
import { router as registerRoutes } from './src/routes/register.routes.js'
import { router as loginRoutes } from './src/routes/login.routes.js'

const app = express();
dotenv.config({ path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}` })

const HOST = process.env.HOST;
const PORT = process.env.AUTH_PORT;


app.use(cors());
app.use(bodyParser.json())
app.use('/register', registerRoutes)
app.use('/login', loginRoutes)

main()

const server = app.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
})

export default server;
