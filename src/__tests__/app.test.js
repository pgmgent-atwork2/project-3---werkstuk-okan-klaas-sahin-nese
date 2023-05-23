import request from 'supertest';
import DataSource from '../lib/DataSource.js';
import app from '../app.js';
import * as dotenv from 'dotenv';
dotenv.config();

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
  describe("Testing HTTP methods", () => {

    test("GET - /api/student", async () => {
      const response = await request(app).get("/api/student");
      expect(response.statusCode).toBe(201);
      expect(Array.isArray(response.body)).toBeTruthy();
    });

    test("GET - /api/student/:id", async () => {
      const response = await request(app).get("/api/student/1");
      expect(response.statusCode).toBe(201);
    });

    test("POST - /api/student", async () => {
      const stream = {
        id: 1,
          email: "klaas.cornette@gmail.com",
          password: "test",
          avatar: "test",
          meta: {
              voornaam: "klaas",
              achternaam: "cornette",
              adres: "adres",
              geboortedatum: '19/09/2001',
              geboorteplaats: 'gent',
          },
          klassen: {
              id: 1,
          },
      }
      const response = await request(app)
        .post("/api/student")
        .send({
          ...stream,    
        });
        // controleren op statuscode
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    test('DELETE - /api/student/:id', async () => {
        const response = await request(app).delete('/api/student/1').send();
        expect(response.status).toBe(201);
    });

    test('PUT - /api/student', async () => {
      const stream = {
          id: 1,
          email: "klaas.cornette@gmail.com",
          password: "test",
          avatar: "test",
          meta: {
              voornaam: "klaas",
              achternaam: "cornette",
              adres: "adres",
              geboortedatum: '19/09/2001',
              geboorteplaats: 'gent',
          },
          klassen: {
              id: 1,
          },
      }
      const response = await request(app).put('/api/streams')
      .send(...stream);
      expect(response.status).toBe(201);
  });

  });
});
  
