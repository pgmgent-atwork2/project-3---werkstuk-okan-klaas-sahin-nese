import DataSource from "../lib/DataSource.js";
import path from "path";
import fs from "fs";
import { PUBLIC_PATH, BASE_URL } from "../constants.js";
import { getAvatars } from "../lib/helpers.js";
import { validationResult } from "express-validator";

export const home = async (req, res) => {
  const avatars = getAvatars();

  res.render("home", {
    user: req.user,
    avatars,
  });
};

export const gebruikers = async (req, res) => {
  const avatars = getAvatars();

  res.render("gebruikers", {
    user: req.user,
    avatars,
  });
};

export const classes = async (req, res) => {
  const avatars = getAvatars();

  const classRepo = DataSource.getRepository("Klassen");

  const allClass = await classRepo.find({});

  res.render("klassen", {
    user: req.user,
    avatars,
    allClass,
  });
};

export const subjects = async (req, res) => {
  const avatars = getAvatars();

  const subjectRepo = DataSource.getRepository("Vakken");

  const allSubjects = await subjectRepo.find();

  res.render("vakken", {
    user: req.user,
    avatars,
    allSubjects,
  });
};

export const addSubj = async (req, res) => {
  const avatars = getAvatars();
  res.render("addSubj", {
    user: req.user,
    avatars,
  });
};

export const deleteSubject = async (req, res) => {
  try {
    const { vakkenId } = req.params;

    const subjectRepo = DataSource.getRepository("Vakken");

    const subject = await subjectRepo.findOneBy({
      id: vakkenId,
    });

    if (subject) {
      await subjectRepo.remove(subject);
    }
    res.render("vakken");
  } catch (e) {
    console.log(e);
  }
};

export const addSubjPost = async (req, res) => {
  try {
    const subjectRepo = DataSource.getRepository("Vakken");

    const subject = await subjectRepo.findOne({
      where: {
        naam: req.body.naam,
        description: req.body.description,
        abbreviation: req.body.abbreviation,
      },
    });

    if (subject) {
      res.status(200).send("Vak bestaat al");
    } else {
      await subjectRepo.save(req.body);
      res.render("addSubj");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Er is een fout");
  }
};

export const subjectDetail = async (req, res) => {
  const avatars = getAvatars();
  const subjectRepo = DataSource.getRepository("Vakken");
  const { vakkenId } = req.params;
  
  const detailSubject = await subjectRepo.findOne({
    where: {id: vakkenId }, 
    relations: ["oefeningen"]
  });
  console.log(detailSubject);

  res.render("detailVak", {
    user: req.user,
    avatars,
    detailSubject,
    detailExercises: detailSubject.oefeningen
  });
};

export const exercises = async (req, res) => {
  const avatars = getAvatars();

  res.render("vakken", {
    user: req.user,
    avatars,
  });
};

export const updateStudent = async (req, res) => {
  const klasRepo = DataSource.getRepository("klassen");
  const allklassen = await klasRepo.find();
  let options = [];
  options[0] = "";
  for (let i = 1; i < allklassen.length + 1; i++) {
    options[i] = {
      value: allklassen[i - 1].naam,
      label: allklassen[i - 1].naam,
    };
  }
  const inputs = [
    {
      name: "adres",
      label: "adres",
      type: "text",
      value: req.body?.adres ? req.body.adres : "",
      sort: "input",
    },
    {
      name: "klas",
      label: "klas",
      type: "select",
      options: options,
      value: req.body?.klas || "",
      sort: "select",
    },
  ];
  res.render("update", {
    layout: "authentication",
    inputs,
  });
};

export const updateTeacher = async (req, res) => {
  const val = validationResult(req);
  const helperError = (errors) => {
    return val.errors.find((error) => error.path === errors)?.msg ?? null;
  };
  const vakkenRepo = DataSource.getRepository("vakken");
  const allvakken = await vakkenRepo.find();
  let options = [];
  for (let i = 0; i < allvakken.length; i++) {
    options[i] = {
      value: allvakken[i].naam,
      label: allvakken[i].naam,
    };
  }
  const inputs = [
    {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: helperError("email", req),
      sort: "input",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      error: helperError("password"),
      sort: "input",
    },
    {
      name: "geboortedatum",
      label: "geboortedatum",
      type: "text",
      value: req.body?.geboortedatum ? req.body.geboortedatum : "",
      error: helperError("geboortedatum"),
      sort: "input",
    },
    {
      name: "voornaam",
      label: "voornaam",
      type: "text",
      value: req.body?.voornaam ? req.body.voornaam : "",
      error: helperError("voornaam"),
      sort: "input",
    },
    {
      name: "achternaam",
      label: "achternaam",
      type: "text",
      value: req.body?.achternaam ? req.body.achternaam : "",
      error: helperError("achternaam"),
      sort: "input",
    },
    {
      name: "vak",
      label: "vak",
      type: "select",
      options: options,
      value: req.body?.vak || "",
      error: helperError("vak"),
      sort: "select",
    },
  ];
  res.render("login", {
    layout: "authentication",
    inputs,
  });
};

export const postUpdateTeacher = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorFields = {};
    errors.array().forEach((error) => {
      errorFields[error.param] = error.msg;
    });
    req.formErrorFields = errorFields;
    return next();
  } else {
    const stafRepo = await DataSource.getRepository("staf");
    const vakkenRepo = await DataSource.getRepository("vakken");
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    let user;
    const vakkenId = await vakkenRepo.findOne({
      where: {
        naam: req.body.vakken,
      },
    });
    user = [
      {
        id: req.params.id,
        email: req.body.email,
        password: hashedPassword,
        role: {
          id: roleId.id,
        },
        meta: {
          voornaam: req.body.voornaam,
          achternaam: req.body.achternaam,
          geboortedatum: req.body.geboortedatum,
        },
        vakken: {
          id: vakkenId.id,
        },
      },
    ];
    await stafRepo.save(user);
    res.redirect("/");
  }
};

export const postUpdateStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorFields = {};
    errors.array().forEach((error) => {
      errorFields[error.param] = error.msg;
    });
    req.formErrorFields = errorFields;
    return next();
  } else {
    const studentRepo = await DataSource.getRepository("student");
    const klasRepo = await DataSource.getRepository("klassen");
    const klasId = await klasRepo.findOne({
      where: {
        naam: req.body.klas,
      },
    });
    const { id } = req.params;
    const user = await studentRepo.findOne({
      where: { id: id },
      relations: ["meta", 'klassen'],
    });
    let update;
    if (req.body.klas != "") {
      update = {
        meta: {
          adres: req.body.adres,
        },
        klassen: {
          id: klasId.id,
        },
      };
    } else {
      update = {
        meta: {
          adres: req.body.adres,
        },
      };
    }
    const updateStudent = {
      ...user,
      ...update,
      meta: {
        ...user.meta,
        ...update.meta,
      },
    };
    console.log(updateStudent);
    await studentRepo.save(updateStudent);
    res.redirect("/student");
  }
};

export const getPersonalData = async (req, res) => {
  const avatars = getAvatars();

  res.render("personalData", {
    user: req.user,
    avatars,
  });
};
