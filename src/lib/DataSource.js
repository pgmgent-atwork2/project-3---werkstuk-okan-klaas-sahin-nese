import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config()

import vakken from "../models/Vakken.js";
import role from "../models/Role.js";
import oefeningen from "../models/Oefeningen.js";
import klassen from "../models/Klassen.js";
import user from "../models/User.js";
import commands from "../models/Commands.js";

const entities = [vakken, role, oefeningen, klassen, commands, user];

const DS = new DataSource({
    type: process.env.DATABASE_TYPE,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    entities: entities,
});

export default DS;
