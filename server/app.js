import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import nodemailer from 'nodemailer';
import centerRouter from './routes/center-routes';
import eventRouter from './routes/event-routes';
import userRouter from './routes/user-routes';

const swaggerDocument = require('./doc/swagger.json');

const sendGridTransport = require('nodemailer-sendgrid-transport');

const port = process.env.PORT || 3088; // port which server runs on
const app = express(); // init express

dotenv.config(); // add env file
// =========CORS===========================
app.use(cors());
// ========= EMAIL CONFIG ===========
global.emailTransport = nodemailer.createTransport(sendGridTransport({
  auth: {
    api_key: process.env.SENDGRID_API_KEY
  }
}));

// =========MIDDLEWARE===================== Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// ===================ROUTER=================
app.use(express.static(path.join(__dirname, '../client')));

app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/v1/', centerRouter);
app.use('/v1/', eventRouter);
app.use('/v1/', userRouter);

// ========= DEFAULT API ROUTE==========
app.get('/v1/*', (req, res) => {
  // Invalid request
  res.status(404).json({
    error: {
      message: 'Invalid URL Request'
    }
  });
});

// ============== STATIC ROUTES ==============
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
  // res   .status(200)   .send('Welcome to my Event Manager API');
});

app.listen(port, () => {
  // console.log('Server running on port', port);
});
export default app;
