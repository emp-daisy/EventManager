import express from 'express';
export const router = express.Router();
import Events from '../classes/events';

router.get('/', (req, res, next) => {
    //res.send('worked');
    new Events(req, res, next).findAll();
    console.log('works');
});

//CREATES AN EVENT
router.post('/events', (req, res, next) => {
    //res.send('worked');
    new Events(req, res, next).findAll();
    console.log('EVENT created');
});

//EDIT AN EVENT
router.put('/events/:id', (req, res, next) => {
    //res.send('worked');
    new Events(req, res, next).findAll();
    console.log('Event editted');
});

//DELETE AN EVENT
router.delete('/events/:id', (req, res, next) => {
    //res.send('worked');
    new Events(req, res, next).findAll();
    console.log('Event deleted');
});

//ADD A NEW CENTER
router.post('/centers', (req, res, next) => {
    //res.send('worked');
    new Events(req, res, next).findAll();
    console.log('Center created');
});

//GET ALL CENTERS
router.get('/centers', (req, res, next) => {
    //res.send('worked');
    new Events(req, res, next).findAll();
    console.log('All center gotten');
});

//GET DETAILS OF A CENTER
router.get('/centers/:id', (req, res, next) => {
    //res.send('worked');
    new Events(req, res, next).findAll();
    console.log('Center Gotten');
});

//MODIFIES DETAIS OF A CENTER
router.put('/centers/:id', (req, res, next) => {
    //res.send('worked');
    new Events(req, res, next).findAll();
    console.log('Center modified');
});