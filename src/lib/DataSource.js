import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config()

import Commands from "../models/Commands.js";
import Klassen from "../models/Klassen.js";
import Oefeningen from "../models/Oefeningen.js";
import Role from "../models/Role.js";
import Staf from "../models/Staf.js";
//import staf_has_klassen_has_vakken from "../models/staf_has_klassen_has_vakken.js";
//import student_has_commands from "../models/student_has_commands.js";
//import student_has_oefeningen from "../models/student_has_oefeningen.js";
import Student from "../models/Student.js";
import Usermeta from "../models/Usermeta.js";
import Vakken from "../models/Vakken.js";


const entities = [Klassen, Oefeningen, Role, Staf, Student, Usermeta, Vakken, Commands];
const DS = new DataSource({
    type: process.env.DATABASE_TYPE,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    entities: entities,
});

export default DS;
