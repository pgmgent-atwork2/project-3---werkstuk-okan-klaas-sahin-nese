import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { SOURCE_PATH } from './constants.js';
import HandlebarsHelpers from './lib/HandlebarsHelpers.js';
import bodyParser from "body-parser";
import * as dotenv from 'dotenv';
dotenv.config();
import DataSource from "./lib/DataSource.js";
import cookieParser from 'cookie-parser';
import { jwtAuth } from './middleware/jwtAuth.js';
import authentication from './middleware/validation/Authentication.js';
import authenticationRegister from './middleware/validation/AuthenticationRegister.js';
import AuthenticationRegisterTeacher from './middleware/validation/AuthenticationRegisterTeacher.js';
import swaggerDefinition from './docs/swagger.js';
import swaggerUi from 'swagger-ui-express';
import multer from 'multer';

import { saveAvatar } from './middleware/saveAvatar.js';

import {
  home, 
} from './controllers/home.js'

import {
  gebruikers,
  updateStudent,
  updateTeacher,
  postUpdateStudent,
  postUpdateTeacher
} from './controllers/users.js'

import {
  getPersonalData,
} from './controllers/profile.js'

import {
 subjects,
  addSubj, 
  addSubjPost, 
  subjectDetail,
  deleteSubject,
} from './controllers/subjects.js'

import {
  addExercises,
  exercises,
  deleteExercise,
} from './controllers/exercises.js'

import {
  allComments,
  postComment,
} from './controllers/comments.js'

import { 
  postRegister, 
  postLogin,
  logout, 
  login, 
  registerStudent,
  registerTeacher,
 } from './controllers/authentication.js';

import {
  getAllKlassen,
  getKlas,
  deleteKlas,
  postKlas,
  updateKlas
} from "./controllers/api/klassen.js";

import {
  getAllVakken,
  getVak,
  deleteVak,
  postVak,
  updateVak
} from "./controllers/api/vakken.js";

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

import {
  getAllStudentsMeta,
  getAllStafMeta,
} from './controllers/meta.js';

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
    helpers: HandlebarsHelpers,
    allowProtoProperties: true,
  });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(SOURCE_PATH, 'views'));


// upload post endpoint
app.post('/uploadAvatar', multer().single('avatar'), saveAvatar, (req, res) => {
  res.redirect('/');
});

// ---------- ROUTES ---------- //

app.get('/', jwtAuth, home);

app.get('/gebruikers', gebruikers)
app.get('/student', jwtAuth, getAllStudentsMeta)
app.get('/teacher', jwtAuth, getAllStafMeta)

app.get('/persoonlijkegegevens', getPersonalData )

app.get('/vakken', jwtAuth, subjects)
app.get('/vakken/toevoegen', addSubj)
app.post('/vakken/toevoegen', addSubjPost)
app.get('/vakken/:vakkenId',jwtAuth, subjectDetail)
app.post('/vakken/:vakkenId', deleteSubject)

app.get('/oefeningen', exercises)
app.post('/oefeningen', addExercises)
app.post('/oefeningen/:oefeningId', deleteExercise)

app.get('/updateteacher/:id', updateTeacher)
app.get('/editstudent/:id', updateStudent)
app.put('/updateteacher/:id', postUpdateTeacher, updateTeacher)
app.post('/editstudent/:id', postUpdateStudent, updateStudent)

app.get('/login', login);
app.get('/registerstudent', registerStudent);
app.post('/registerstudent', authenticationRegister, postRegister, registerStudent);
app.get('/registerteacher', registerTeacher);
app.post('/registerteacher', AuthenticationRegisterTeacher, postRegister, registerTeacher);


app.post('/login', authentication, postLogin, jwtAuth, login);
app.post('/logout', authentication, logout);

//users
app.get("/api/student", getAllStudents);
app.get("/api/student/:id", getStudents)
app.post("/api/student/:id", deleteStudents);
app.post("/api/student", postStudents);
app.put("/api/student", updateStudents);

app.get("/api/staf", getAllStaf);
app.get("/api/staf/:id", getStaf)
app.post("/api/staf/:id", deleteStaf);
app.post("/api/staf", postStaf);
app.put("/api/staf", updateStaf);

//commands

app.get("/comments", allComments)
app.post("/comments", postComment)
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

//klassen

app.get("/api/klassen/:id", getKlas);
app.get("/api/klassen", getAllKlassen)
app.delete("/api/klassen", deleteKlas);
app.post("/api/klassen", postKlas);
app.put("/api/klassen", updateKlas);

//vakken

app.get("/api/vakken/:id", getVak);
app.get("/api/vakken", getAllVakken)
app.delete("/api/vakken", deleteVak);
app.post("/api/vakken", postVak);
app.put("/api/vakken", updateVak);

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