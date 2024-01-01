import express from 'express';
import router from '../Routes/route.js';

const route = express.Router();
route.use('/user', router);

export default route;