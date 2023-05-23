import { makestudents } from "./seeder.js";
import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import DataSource from "../../lib/DataSource.js";
const app = express();
DataSource.initialize().then(() => { 
      app.listen(process.env.PORT, () => {
        console.log(
          `Application is running on http://localhost:${process.env.PORT}/.`
        );
        makestudents();
      });
    })
    .catch((error) => {
      console.log('Error: ', error);
    });

