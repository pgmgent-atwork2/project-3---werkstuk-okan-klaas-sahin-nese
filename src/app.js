import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { SOURCE_PATH } from './constants.js';
import HandelbarsHelpers from './lib/HandelbarsHelpers.js';
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';
dotenv.config();
import DataSource from "./lib/DataSource.js";
import cookieParser from 'cookie-parser';
import { jwtAuth } from './middleware/jwtAuth.js';
import authentication from './middleware/validation/Authentication.js';
import swaggerDefinition from './docs/swagger.js';
import swaggerUi from 'swagger-ui-express';

import {home} from './controllers/home.js'
import { postRegister, postLogin, logout, login, register, } from './controllers/authentication.js';


import { 
  getAllCommands,
  getCommand,
  deleteCommand,
  postCommand
 } from "./controllers/api/commands.js";
 import { 
  getAllOef,
  getOef,
  deleteOef,
  postOef,
  updateOef
 } from "./controllers/api/oefeningen.js";
 import { 
  getAllStaf,
  deleteStaf,
  postStaf,
  updateStaf,
  getStaf
 } from "./controllers/api/staf.js";
 import { 
  getAllStudents,
  deleteStudents,
  postStudents,
  updateStudents,
  getStudents
 } from "./controllers/api/student.js";


// create express app
const app = express();

// serve static file
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// adding swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// Tell express to use the cookie parser
app.use(cookieParser());

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

app.get('/', jwtAuth, home);

app.get('/login', login);
app.get('/register', register);
app.post('/register', postRegister, register);
app.post('/login', authentication, postLogin, jwtAuth, login);
app.post('/logout', authentication, logout);

//users
app.get("/api/student", getAllStudents);
app.get("/api/student/:id", getStudents)
app.delete("/api/student", deleteStudents);
app.post("/api/student", postStudents);
app.put("/api/student", updateStudents);

app.get("/api/staf", getAllStaf);
app.get("/api/staf/:id", getStaf)
app.delete("/api/staf", deleteStaf);
app.post("/api/staf", postStaf);
app.put("/api/staf", updateStaf);

//commands

app.get("/api/commands", getAllCommands);
app.get("/api/commands/:id", getCommand)
app.delete("/api/commands", deleteCommand);
app.post("/api/commands", postCommand);


//oefeningen

app.get("/api/oefeningen", getAllOef);
app.get("/api/oefeningen/:id", getOef)
app.delete("/api/oefeningen", deleteOef);
app.post("/api/oefeningen", postOef);
app.put("/api/oefeningen", updateOef);


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