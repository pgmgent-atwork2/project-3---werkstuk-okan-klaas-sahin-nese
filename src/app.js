import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { SOURCE_PATH } from './constants.js';
import HandelbarsHelpers from './lib/HandelbarsHelpers.js';

import {home} from './controllers/home.js'
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
  getU,
  deleteUser,
  postUser,
  updateUser,
  getUser
 } from "./controllers/api/user.js";

// create express app
const app = express();

// serve static file
app.use(express.static('public'));

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
app.get("/api/oefeningen/:id", getAllOef)
app.delete("/api/oefeningen", deleteOef);
app.post("/api/oefeningen", postOef);
app.put("/api/oefeningen", updateOef);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});

export default app;