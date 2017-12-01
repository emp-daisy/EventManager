import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './doc/swagger.json';
import eventRouter from './routes/event-routes';
import centerRouter from './routes/center-routes';
import userRouter from './routes/user-routes';

const port = process.env.PORT || 3088; // port which server runs on
const app = express(); // init express

dotenv.config(); // add env file

//= ========MIDDLEWARE=====================
// Log requests to the console.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//= ==================ROUTER=================
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/v1/', centerRouter);
app.use('/v1/', eventRouter);
app.use('/v1/', userRouter);

app.get('/', (req, res) => {
  // res.sendFile(path.resolve(__dirname, '../template/html/index.html'));
  res.status(200).send('Welcome to my Event Manager route');
});

//= ======== DEFAULT ROUTE==========
app.get('/*', (req, res) => {
  // Invalid request
  res.status(404).json({
    error: {
      name: 'Error',
      message: 'Invalid URL Request'
    }
  });
});


app.listen(port, () => {
  console.log('Server running on port', port);
});
export default app;