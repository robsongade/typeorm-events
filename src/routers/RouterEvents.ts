import {Router} from 'express'
import EventsController from './../controller/EventsController'
const RouterEvents = Router();
RouterEvents.post('/send/:id', EventsController.addNest);
RouterEvents.get('/bind/:id', EventsController.eventsHandler);
RouterEvents.get('/status/:id', (req, res) => res.json({status: true}));

export default RouterEvents