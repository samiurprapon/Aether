// third party imports
import express, { json, urlencoded } from 'express';
import cors from './utils/cors';

// project imports
import morgan from './utils/morgan';
import compression from './utils/compression';
import routes from './routes';
const app = express();

/*
 * express settings
 */

app.use(cors());
app.disable('x-powered-by'); // hide powered by express
app.set('trust proxy', 1); // enable trust proxy to get real ip address
app.use(json()); // parse application/json
app.use(urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(morgan()); // log api requests
app.use(compression()); // compress to level -1

// add public folder
app.use(express.static('public'));

app.use('/api', routes); // add app routes here

export default app;
