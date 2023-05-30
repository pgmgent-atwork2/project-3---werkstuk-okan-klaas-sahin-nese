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
      const student = {
        id : 1000,
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
        .send(student);
        // controleren op statuscode
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    test('DELETE - /api/student', async () => {
      const del = {
        id : 1000,
      }
        const response = await request(app).delete('/api/student').send(del);
        expect(response.status).toBe(204);
    });

    test('PUT - /api/student', async () => {
      const student = {
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
      const response = await request(app).put('/api/student')
      .send(student);
      expect(response.status).toBe(201);
  });



  test("GET - /api/staf", async () => {
    const response = await request(app).get("/api/staf");
    expect(response.statusCode).toBe(201);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test("GET - /api/staf/:id", async () => {
    const response = await request(app).get("/api/staf/1");
    expect(response.statusCode).toBe(201);
  });

  test("POST - /api/staf", async () => {
    const staf = {
      id : 1000,
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
        vakken: [{
          id: 1,
      },
      {
          id: 2,
      }],
      role: {
          id: 2,
      }
    }
    const response = await request(app)
      .post("/api/staf")
      .send(staf);
      // controleren op statuscode
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("id");
  });

  test('DELETE - /api/staf', async () => {
    const del = {
      id : 1000,
    }
      const response = await request(app).delete('/api/staf').send(del);
      expect(response.status).toBe(204);
  });

  test('PUT - /api/staf', async () => {
    const staf = {
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
        vakken: [{
          id: 1,
      },
      {
          id: 2,
      }],
      role: {
          id: 2,
      }
    }
    const response = await request(app).put('/api/staf')
    .send(staf);
    expect(response.status).toBe(201);
});

test("GET - /api/oefeningen", async () => {
  const response = await request(app).get("/api/oefeningen");
  expect(response.statusCode).toBe(201);
  expect(Array.isArray(response.body)).toBeTruthy();
});

test("GET - /api/oefeningen/:id", async () => {
  const response = await request(app).get("/api/oefeningen/1");
  expect(response.statusCode).toBe(201);
});

test("POST - /api/oefeningen", async () => {
  const oef = {
    id : 1000,
    naam: "oef1",
    link: "link oef 1",
    niveau: 3,
    vakken: {
      id : 1,
    },
    student: {
      id: 60,
  }
}
  const response = await request(app)
    .post("/api/oefeningen")
    .send(oef);
    // controleren op statuscode
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
});

test('DELETE - /api/oefeningen', async () => {
  const del = {
    id : 1000,
  }
    const response = await request(app).delete('/api/oefeningen').send(del);
    expect(response.status).toBe(204);
});

test('PUT - /api/oefeningen', async () => {
  const oef = {
      naam: "oef1",
      link: "link oef 1",
      niveau: 3,
      vakken: {
        id : 1,
      },
      student: {
        id: 60,
    }
  }
  const response = await request(app).put('/api/oefeningen')
  .send(oef);
  expect(response.status).toBe(201);
});

test("GET - /api/commands", async () => {
  const response = await request(app).get("/api/commands");
  expect(response.statusCode).toBe(201);
  expect(Array.isArray(response.body)).toBeTruthy();
});

test("GET - /api/commands/:id", async () => {
  const response = await request(app).get("/api/commands/1");
  expect(response.statusCode).toBe(201);
});

test("POST - /api/commands", async () => {
  const command = {
    id : 1000,
      inhoud: "je hebt het goed gedaan",
      vakken: {
        id : 1,
      },
      student: {
        id: 60,
    }
  }
  const response = await request(app)
    .post("/api/commands")
    .send(command);
    // controleren op statuscode
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
});

test('DELETE - /api/commands', async () => {
  const del = {
    id : 1000,
  }
    const response = await request(app).delete('/api/commands').send(del);
    expect(response.status).toBe(204);
});

test("GET - /api/klassen", async () => {
  const response = await request(app).get("/api/klassen");
  expect(response.statusCode).toBe(201);
  expect(Array.isArray(response.body)).toBeTruthy();
});

test("GET - /api/klassen/:id", async () => {
  const response = await request(app).get("/api/klassen/1");
  expect(response.statusCode).toBe(201);
});

test("POST - /api/klassen", async () => {
  const klas = {
    id : 1000,
      naam: "1C",
      vakken: {
        id : 1,
      },
    staf: {
      id: 50,
    }
  }
  const response = await request(app)
    .post("/api/klassen")
    .send(klas);
    // controleren op statuscode
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
});

test('DELETE - /api/klassen/', async () => {
  const del = {
    id : 1000,
  }
    const response = await request(app).delete('/api/klassen').send(del);
    expect(response.status).toBe(204);
});

test('PUT - /api/klassen', async () => {
  const klas = {
    naam: "1C",
    vakken: {
      id : 1,
    },
    student: {
      id: 60,
  },
  staf: {
    id: 42,
  }
}
  const response = await request(app).put('/api/klassen')
  .send(klas);
  expect(response.status).toBe(201);
});







  test("GET - /api/vakken", async () => {
    const response = await request(app).get("/api/vakken");
    expect(response.statusCode).toBe(201);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
  
  test("GET - /api/vakken/:id", async () => {
    const response = await request(app).get("/api/vakken/1");
    expect(response.statusCode).toBe(201);
  });
  
  test("POST - /api/vakken", async () => {
    const vak = {
      id : 1000,
      naam: "vakTest",
      vakcomentaar: "test"
    }
    const response = await request(app)
      .post("/api/vakken")
      .send(vak);
      // controleren op statuscode
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("id");
  });
  
  test('DELETE - /api/vakken/', async () => {
    const del = {
      id : 1000,
    }
      const response = await request(app).delete('/api/vakken').send(del);
      expect(response.status).toBe(204);
  });
  
  test('PUT - /api/vakken', async () => {
    const vak = {
      naam: "vakTest",
      vakcomentaar: "test"
  }
    const response = await request(app).put('/api/vakken')
    .send(vak);
    expect(response.status).toBe(201);
  });
    });
});

  
