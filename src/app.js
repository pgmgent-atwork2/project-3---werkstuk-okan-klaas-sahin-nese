import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { SOURCE_PATH } from './constants.js';
import HandelbarsHelpers from './lib/HandelbarsHelpers.js';
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';
import DataSource from "./lib/DataSource.js";
import cookieParser from 'cookie-parser';
import { jwtAuth } from './middleware/jwtAuth.js';
import authentication from './middleware/validation/Authentication.js';
import swaggerDefinition from './docs/swagger.js';
import swaggerUi from 'swagger-ui-express';

//database initalize
import fs from "fs";
//const sql = fs.readFileSync('database.sql').toString();


import {home} from './controllers/home.js'
import { postRegister, postLogin, logout, login, register } from './controllers/authentication.js';

dotenv.config();
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
  getAllUsers,
  deleteUser,
  postUser,
  updateUser,
  getUser
 } from "./controllers/api/user.js";

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
app.post('/register', postRegister);
app.post('/login', authentication, postLogin, jwtAuth);
app.post('/logout', authentication, logout);

//users
app.get("/api/user", getAllUsers);
app.get("/api/user/:id", getUser)
app.delete("/api/user", deleteUser);
app.post("/api/user", postUser);
app.put("/api/user", updateUser);

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
      // dit was om de database te genereren 
      //DataSource.query(sql, (error, results, fields) => {
       // if (error) throw error;
       // console.log(results);
     // });
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