import * as express from 'express';
import * as http from 'http';
import { connect } from 'mongoose';
import * as morgan from 'morgan';
import 'reflect-metadata';
import { useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import './controllers/categories.controller';
import './controllers/products.controller';

declare const process: any;

useContainer(Container);

const app = express();
const server = http.createServer(app);

connect('mongodb://localhost/shop-shar');

// app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: true
}));

useExpressServer(app);

const port = process.env.PORT || 3030; 
server.listen(port, () => console.log(`Http Server started on ${port}`));

