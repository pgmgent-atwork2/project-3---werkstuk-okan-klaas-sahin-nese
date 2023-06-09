/**
 * An authentication Controller
 */

import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import DataSource from "../lib/DataSource.js";
import bcrypt from "bcrypt";



export const registerTeacher = async (req, res) => {
  // errors
  const val = validationResult(req);
  const helperError = (errors) => {
    return val.errors.find(error => error.path === errors)?.msg ?? null;
  };
  const formErrors = req.formErrors;
  const vakkenRepo = DataSource.getRepository("vakken");
  const allvakken = await vakkenRepo.find();
  // input fields
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
    {
      name: "role",
      label: "role",
      type: "select",
      options: [
        { value: "teacher", label: "teacher" },
        { value: "admin", label: "admin" },    
      ],
      value: req.body?.role || "",
      error: helperError('role'),
      sort: "select",
    },
  ];

  // render the register page
  res.render("register", {
    layout: "authentication",
    inputs,
    formErrors,
  });
};

export const registerStudent = async (req, res) => {
  // errors
  const val = validationResult(req);
  const helperError = (errors) => {
    return val.errors.find(error => error.path === errors)?.msg ?? null;
  };
  const formErrors = req.formErrors;
  const klasRepo = DataSource.getRepository("klassen");
  const allklassen = await klasRepo.find();
  // input fields
  let options = [];
  for (let i = 0; i < allklassen.length; i++) {
    options[i] = {
      value: allklassen[i].naam,
      label: allklassen[i].naam,
    };
  }
  console.log(options);
  // input fields
  const inputs = [
    {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: helperError('email'),
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
      name: "adres",
      label: "adres",
      type: "text",
      value: req.body?.adres ? req.body.adres : "",
      error: helperError('adres'),
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
      name: "geboorteplaats",
      label: "geboorteplaats",
      type: "text",
      value: req.body?.geboorteplaats ? req.body.geboorteplaats : "",
      error: helperError('geboorteplaats'),
      sort: "input",
    },
    {
      name: "klas",
      label: "klas",
      type: "select",
      options: options,
      value: req.body?.klas || "",
      error: helperError('klas'),
      sort: "select",
    },
  ];

  // render the register page
  res.render("register", {
    layout: "authentication",
    inputs,
    formErrors,
  });
};

export const login = async (req, res) => {
  // errors
  const formErrors = req.formErrors;
  const val = validationResult(req);
  const helperError = (errors) => {
    return val.errors.find(error => error.path === errors)?.msg ?? null;
  };
  // input fields
  const inputs = [
    {
      name: "email",
      label: "E-mailadres",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: helperError('email'),
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      error: helperError('password'),
    },
  ];

  // render the login page
  res.render("login", {
    layout: "authentication",
    // toevoegen van data aan de view
    inputs,
    formErrors,
  });
};

export const postRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    // if we have validation errors
    if (!errors.isEmpty()) {
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });
      // put the errorfields in the current request
      req.formErrorFields = errorFields;

      return next();
    } else {
      // make user repository instance
      const studentRepo = await DataSource.getRepository("student");
      const stafRepo = await DataSource.getRepository("staf");
      const roleReop = await DataSource.getRepository("role");
      const klasRepo = await DataSource.getRepository("klassen");
      const vakkenRepo = await DataSource.getRepository("vakken");
      let userExists = await studentRepo.findOne({
        where: {
          email: req.body.email,
        },
      });

      userExists = await stafRepo.findOne({
        where: {
          email: req.body.email,
        },
      });

      const role = req.body.role;

      if (userExists) {
        req.formErrors = [{ message: "Gebruiker bestaat al." }];
        return next();
      }
      
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      let user;
      const vakkenId = await vakkenRepo.findOne({
        where: {
          naam: req.body.vakken,
        },
      });
      const klasId = await klasRepo.findOne({
        where: {
          naam: req.body.klas,
        },
      });
      if (role == "teacher" || role == "admin") {
        const roleId = await roleReop.findOne({
          where: {
            label: role,
          },
        });
          user = await stafRepo.create({
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
          });
          // save the user
        await stafRepo.save(user);
        res.redirect("/teacher");
        }else{
            user = await studentRepo.create({
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
            });
            // save the user
            await studentRepo.save(user);
            res.redirect("/student");
          }
      
    }
  } catch (e) {
    next(e.message);
  }
};

export const postLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    // if we have validation errors
    if (!errors.isEmpty()) {
      console.log("er is iets mis");
      // create an object with the error fields
      const errorFields = {};
      // iterate over the errors
      errors.array().forEach((error) => {
        errorFields[error.param] = error.msg;
      });
      // put the errorfields in the current request
      req.formErrorFields = errorFields;

      return next();
    } else {
      // get the user
      const stafRepo = await DataSource.getRepository("staf");
      const studentRepo = await DataSource.getRepository("student");
      // change email to lowercase letters
      const lwEmail = req.body.email.toLowerCase();
      let user;
      let role;
      // get a user with a specific email adress
      //we moeten nog knop maken voor of het leerkracht is of student
      user = await studentRepo.findOne({
        where: {
          email: lwEmail,
        },
      });
      if (user) {
        role = "student";
      }
      if (!user) {
        user = await stafRepo.findOne({
          where: {
            email: lwEmail,
          },
        });
        role = "staf";
      }
      // authentication validation
      if (!user) {
        req.formErrors = [{ message: "Gebruiker bestaat niet." }];
        return next();
      }

      // compare hashed password with saved hashed password
      const givenPassword = req.body.password; // supersecret
      const dbPassword = user.password; //$2b$10$9sWBzAraG2EQHZs62uyVdeH2dJxDAM4aWwlcNKWHAX.m2ZUjneEQa
      const isAMatch = bcrypt.compareSync(givenPassword, dbPassword); // true or false

      // password check
      if (!isAMatch) {
        req.formErrors = [{ message: "Wachtwoord is niet correct." }];
        return next();
      }
      // create the JWT web token, aka our identity card
      const token = jwt.sign(
        { id: user.id, email: req.body.email, role: role },
        process.env.TOKEN_SALT,
        { expiresIn: "1h" }
      );

      // create a cookie and add this to the response
      res.cookie("token", token, { httpOnly: true });

      // redirect to our root
      res.redirect("/");
    }
  } catch (e) {
    next(e.message);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
