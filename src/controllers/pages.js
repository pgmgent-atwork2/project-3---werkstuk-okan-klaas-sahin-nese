import DataSource from "../lib/DataSource.js";
import path from 'path';
import fs from 'fs';
import { PUBLIC_PATH, BASE_URL } from '../constants.js';
import { getAvatars } from "../lib/helpers.js";
import { validationResult } from "express-validator";

export const home = async (req, res) => {

  const avatars = getAvatars();
      

   res.render("home", {
      user: req.user,
      avatars,
    });
  };

export const gebruikers = async(req, res) => {

  const avatars = getAvatars();

  res.render("gebruikers", {
    user: req.user,
    avatars
  });

}

export const classes = async(req, res) => {
  const avatars = getAvatars();

  const classRepo = DataSource.getRepository('Klassen')

  const allClass = await classRepo.find({})

  res.render("klassen", {
    user: req.user,
    avatars,
    allClass
  });

}

export const subjects = async(req, res) => {
  const avatars = getAvatars();

  const subjectRepo = DataSource.getRepository('Vakken')

  const allSubjects = await subjectRepo.find()

  res.render("vakken", {
    user: req.user,
    avatars,
    allSubjects
  });
}

export const addSubj = async (req, res) => {
  const avatars = getAvatars();
  res.render("addSubj", {
    user: req.user,
    avatars
  });
}

export const deleteSubject = async (req, res) => {
  try{

    const { vakkenId } = req.params;

    const subjectRepo = DataSource.getRepository('Vakken');

    const subject = await subjectRepo.findOneBy({
     id: vakkenId
    });

    if(subject) {
      await subjectRepo.remove(subject)
      
    } 
      res.render('vakken')
    

  } catch (e) {
    console.log(e);
  }
}

export const addSubjPost = async (req, res) => {
  try {
    const subjectRepo = DataSource.getRepository('Vakken');

    const subject = await subjectRepo.findOne({
      where: {
        naam: req.body.naam,
        description: req.body.description,
        abbreviation: req.body.abbreviation
      }
    });

    if (subject) {
      res.status(200).send("Vak bestaat al");
    } else {
      await subjectRepo.save(req.body);
      res.render('addSubj');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Er is een fout");
  }
};

export const subjectDetail = async (req, res) => {
  const avatars = getAvatars();
  const subjectRepo = DataSource.getRepository('Vakken')
  const { vakkenId } = req.params;
  console.log(vakkenId)
  const detailSubject = await subjectRepo.findOneBy({ id: vakkenId }, { relations: ["oefeningen"] });


  const exercisRepo = DataSource.getRepository('Oefeningen')

const detailExercises = await exercisRepo.find({where: {id: vakkenId}})
  console.log( detailExercises)
  res.render("detailVak", {
    user: req.user,
    avatars,
    detailSubject,
    detailExercises
  });
}

export const exercises = async(req, res) => {

  const avatars = getAvatars();

  res.render("vakken", {
    user: req.user,
    avatars
  });

}

export const updateStudent = async(req, res) => {
  const klasRepo = DataSource.getRepository("klassen");
  const allklassen = await klasRepo.find();
  let options = [];
  for (let i = 0; i < allklassen.length; i++) {
    options[i] = {
      value: allklassen[i].naam,
      label: allklassen[i].naam,
    };
  }
  const inputs = [
    {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      sort: "input",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      sort: "input",
    },
    {
      name: "adres",
      label: "adres",
      type: "text",
      value: req.body?.adres ? req.body.adres : "",
      sort: "input",
    },
    {
      name: "geboortedatum",
      label: "geboortedatum",
      type: "text",
      value: req.body?.geboortedatum ? req.body.geboortedatum : "",
      sort: "input",
    },
    {
      name: "voornaam",
      label: "voornaam",
      type: "text",
      value: req.body?.voornaam ? req.body.voornaam : "",
      sort: "input",
    },
    {
      name: "achternaam",
      label: "achternaam",
      type: "text",
      value: req.body?.achternaam ? req.body.achternaam : "",
      sort: "input",
    },
    {
      name: "geboorteplaats",
      label: "geboorteplaats",
      type: "text",
      value: req.body?.geboorteplaats ? req.body.geboorteplaats : "",
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
}

export const updateTeacher= async(req, res) => {
  const val = validationResult(req);
  const helperError = (errors) => {
   return val.errors.find(error => error.path === errors)?.msg ?? null;
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
      error: helperError('email', req),
      sort: "input",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      error: helperError('password'),
      sort: "input",
    },
    {
      name: "geboortedatum",
      label: "geboortedatum",
      type: "text",
      value: req.body?.geboortedatum ? req.body.geboortedatum : "",
      error: helperError('geboortedatum'),
      sort: "input",
    },
    {
      name: "voornaam",
      label: "voornaam",
      type: "text",
      value: req.body?.voornaam ? req.body.voornaam : "",
      error: helperError('voornaam'),
      sort: "input",
    },
    {
      name: "achternaam",
      label: "achternaam",
      type: "text",
      value: req.body?.achternaam ? req.body.achternaam : "",
      error: helperError('achternaam'),
      sort: "input",
    },
    {
      name: "vak",
      label: "vak",
      type: "select",
      options: options,
      value: req.body?.vak || "",
      error: helperError('vak'),
      sort: "select",
    },
  ];
  res.render("login", {
    layout: "authentication",
    inputs,
  });
};

export const postUpdateTeacher = async(req, res) => {
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
      user = [{
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
      }];
      await stafRepo.save(user);
      res.redirect("/");
    }
  }

export const postUpdateStudent = async(req, res) => {
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
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      let user;
      const klasId = await klasRepo.findOne({
        where: {
          naam: req.body.klas,
        },
      });
      user = [{
        id: req.params.id,
        email: req.body.email,
        password: hashedPassword,
        meta: {
          voornaam: req.body.voornaam,
          achternaam: req.body.achternaam,
          adres: req.body.adres,
          geboortedatum: req.body.geboortedatum,
          geboorteplaats: req.body.geboorteplaats,
        },
        klassen: {
          id: klasId.id,
        },
      }];
        await studentRepo.save(user);
        res.redirect("/");
      }
    }
  
