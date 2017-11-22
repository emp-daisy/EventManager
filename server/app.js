import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import {
    router
} from './routes/events';

const port = process.env.port || 3000; //port which server runs on

let app = express(); //init express

//=========MIDDLEWARE=====================
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//    extended: false
//}));
//===================ROUTER=================
app.use('/', router);
app.use('/events', router);
app.use('/center', router);

app.listen(port, () => {
    console.log('Server running on port', port);
});