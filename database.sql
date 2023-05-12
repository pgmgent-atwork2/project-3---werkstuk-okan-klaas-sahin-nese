PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS usermeta (
  id_leerling INTEGER NOT NULL PRIMARY KEY,
  adres TEXT,
  geboortedatum TEXT,
  voornaam TEXT NOT NULL,
  naam TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS klassen (
  idklassen INTEGER NOT NULL PRIMARY KEY,
  naam TEXT
);

CREATE TABLE IF NOT EXISTS student (
  iduser INTEGER NOT NULL,
  Email TEXT,
  Pasword TEXT,
  avatar TEXT,
  personen_id_leerling INTEGER NOT NULL,
  klassen_idklassen INTEGER NOT NULL,
  PRIMARY KEY (iduser, personen_id_leerling, klassen_idklassen),
  FOREIGN KEY (personen_id_leerling) REFERENCES usermeta (id_leerling),
  FOREIGN KEY (klassen_idklassen) REFERENCES klassen (idklassen)
);

CREATE TABLE IF NOT EXISTS vakken (
  idvakken INTEGER NOT NULL PRIMARY KEY,
  naam TEXT
);

CREATE TABLE IF NOT EXISTS oefeningen (
  idoefeningen INTEGER NOT NULL,
  naam TEXT,
  link TEXT,
  niveau TEXT,
  vakken_idvakken INTEGER NOT NULL,
  PRIMARY KEY (idoefeningen, vakken_idvakken),
  FOREIGN KEY (vakken_idvakken) REFERENCES vakken (idvakken)
);

CREATE TABLE IF NOT EXISTS commands (
  idcommands INTEGER NOT NULL,
  inhoud TEXT,
  vakken_idvakken INTEGER NOT NULL,
  PRIMARY KEY (idcommands, vakken_idvakken),
  FOREIGN KEY (vakken_idvakken) REFERENCES vakken (idvakken)
);

CREATE TABLE IF NOT EXISTS klassen_has_vakken (
  klassen_idklassen INTEGER NOT NULL,
  vakken_idvakken INTEGER NOT NULL,
  PRIMARY KEY (klassen_idklassen, vakken_idvakken),
  FOREIGN KEY (klassen_idklassen)
    REFERENCES klassen (idklassen)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY (vakken_idvakken)
    REFERENCES vakken (idvakken)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS role (
  idrole INTEGER NOT NULL PRIMARY KEY,
  label TEXT
);

CREATE TABLE IF NOT EXISTS staf (
  iduser INTEGER NOT NULL PRIMARY KEY,
  Email TEXT,
  Pasword TEXT,
  avatar TEXT,
  role_idrole INTEGER NOT NULL,
  usermeta_id_leerling INTEGER NOT NULL,
  FOREIGN KEY (role_idrole)
    REFERENCES role (idrole)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY (usermeta_id_leerling)
    REFERENCES usermeta (id_leerling)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS staf_has_klassen_has_vakken (
  staf_iduser INTEGER NOT NULL,
  klassen_has_vakken_klassen_idklassen INTEGER NOT NULL,
  klassen_has_vakken_vakken_idvakken INTEGER NOT NULL,
  PRIMARY KEY (staf_iduser, klassen_has_vakken_klassen_idklassen, klassen_has_vakken_vakken_idvakken),
  FOREIGN KEY (staf_iduser)
    REFERENCES staf (iduser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY (klassen_has_vakken_klassen_idklassen, klassen_has_vakken_vakken_idvakken)
    REFERENCES klassen_has_vakken (klassen_idklassen, vakken_idvakken)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS student_has_oefeningen (
  student_iduser INTEGER NOT NULL,
  oefeningen_idoefeningen INTEGER NOT NULL,
  score REAL NOT NULL,
  PRIMARY KEY (student_iduser, oefeningen_idoefeningen),
  FOREIGN KEY (student_iduser)
    REFERENCES student (iduser)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY (oefeningen_idoefeningen)
    REFERENCES oefeningen (idoefeningen)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS student_has_commands (
  student_iduser INTEGER NOT NULL,
  student_personen_id_leerling INTEGER NOT NULL,
  student_klassen_idklassen INTEGER NOT NULL,
  commands_idcommands INTEGER NOT NULL,
  commands_vakken_idvakken INTEGER NOT NULL,
  PRIMARY KEY (student_iduser, student_personen_id_leerling, student_klassen_idklassen, commands_idcommands, commands_vakken_idvakken),
  FOREIGN KEY (student_iduser, student_personen_id_leerling, student_klassen_idklassen)
    REFERENCES student(iduser, personen_id_leerling, klassen_idklassen)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  FOREIGN KEY (commands_idcommands, commands_vakken_idvakken)
    REFERENCES commands(idcommands, vakken_idvakken)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
