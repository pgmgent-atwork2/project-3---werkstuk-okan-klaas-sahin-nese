import request from 'supertest';
import DataSource from '../lib/DataSource.js';
import app from '../app.js';

let server;
// een groep maken met describe
describe('API test', () => {
  beforeAll(async () => {
    // 1. create a connection with the database and WAIT!
    await DataSource.initialize();
    // 2. Application, start listening for incoming requests (used during test)
    server = app.listen(process.env.PORT, () => {
      console.log(
        `Application is running on http://localhost:${process.env.PORT}/.`
      );
    });
  });
  afterAll(async () => {
    // 1. close the connection with the database
    await DataSource.destroy();
    // 2. close the server
    server.close();
  });
  describe('Testing HTTP methods', () => {


  });
});
