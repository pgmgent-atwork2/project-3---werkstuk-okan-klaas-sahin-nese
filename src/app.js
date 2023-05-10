import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { SOURCE_PATH } from './constants.js';
import HandelbarsHelpers from './lib/HandelbarsHelpers.js';
import bodyParser from "body-parser";
import DataSource from "./lib/DataSource.js";
import * as dotenv from 'dotenv';

import {home} from './controllers/home.js'

dotenv.config();

// create express app
const app = express();

// serve static file
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ------------ HANDLEBARS -----------//

// create an instance of express-handlebars
const hbs = create({
    extname: 'hbs',
    helpers: HandelbarsHelpers,
    allowProtoProperties: true,
  });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(SOURCE_PATH, 'views'));

// ---------- ROUTES ---------- //

app.get('/', home);

if (process.env.NODE_ENV !== 'test')
  DataSource.initialize()
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(
          `Application is running on http://localhost:${process.env.PORT}/.`
        );
      });
    })
    .catch((error) => {
      console.log('Error: ', error);
    });

export default app;