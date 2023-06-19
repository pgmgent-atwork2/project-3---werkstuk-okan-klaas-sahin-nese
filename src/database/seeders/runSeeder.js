import express from 'express';
import * as dotenv from 'dotenv';
import { makestudents, maketeacher } from './seeder.js';
import DataSource from '../../lib/DataSource.js';

dotenv.config();

const app = express();
async function closeConnection() {
  await DataSource.close();
  console.log('Database connection closed.');
  process.exit(0);
}

DataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Application is running on http://localhost:${process.env.PORT}/.`
      );
    });
  })
  .then(() => {
    maketeacher();
    makestudents().then(() => {
      closeConnection();
    });
  })
  .catch((error) => {
    console.log('Error: ', error);
  });
