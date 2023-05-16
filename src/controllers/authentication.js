/**
 * An authentication Controller
 */

import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import DataSource from "../lib/DataSource.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  // errors
  const formErrors = req.formErrors;

  // input fields
  const inputs = [
    {
      name: "email",
      label: "E-mail",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: req.formErrorFields?.email ? req.formErrorFields.email : null,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      error: req.formErrorFields?.password
        ? req.formErrorFields.password
        : null,
    },
  ];

  // get the roles
  const roleRepository = await DataSource.getRepository("role");
  const roles = await roleRepository.find();

  // render the register page
  res.render("register", {
    layout: "authentication",
    inputs,
    formErrors,
    roles,
  });
};

export const login = async (req, res) => {
  // errors
  const formErrors = req.formErrors;

  // input fields
  const inputs = [
    {
      name: "email",
      label: "E-mailadres",
      type: "text",
      value: req.body?.email ? req.body.email : "",
      error: req.formErrorFields?.email ? req.formErrorFields.email : null,
    },
    {
      name: "password",
      label: "Wachtwoord",
      type: "password",
      password: req.body?.password ? req.body.password : "",
      error: req.formErrorFields?.password
        ? req.formErrorFields.password
        : null,
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

    //  const role = await roleRepository.findOne({
    //    where: {
    //      label: req.body.role,
    //    },
    //  });

    //  if(!role) {
    //    req.formErrors = [{ message: "Rol bestaat niet." }];
    //    return next();
    //  }
      if (userExists) {
        req.formErrors = [{ message: "Gebruiker bestaat al." }];
        return next();
      }

      const role = 'admin';
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      let user;
      if(role == 'leerkracht' || role == 'admin'){
        user = await stafRepo.create({
          email: req.body.email,
          password: hashedPassword,
          role: {
            id: role,
          }
        });
        // save the user
        await stafRepo.save(user);
      }else{
        user = await studentRepo.create({
          email: req.body.email,
          password: hashedPassword,
        });
        // save the user
        await studentRepo.save(user);
      }

      
      

      res.redirect("/login");
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
      const studentRepo = await DataSource.getRepository('student');
      // change email to lowercase letters
      const lwEmail = req.body.email.toLowerCase();
      let user;
      console.log('kaakakkaak')
      // get a user with a specific email adress
      //we moeten nog knop maken voor of het leerkracht is of student
      let stafboolean = true;
      user = await studentRepo.findOne({
        where: {
          email: lwEmail,
        },
      });
      if(stafboolean){
        user = await stafRepo.findOne({
          where: {
            email: lwEmail,
          },
        });
      }else{
        user = await studentRepo.findOne({
          where: {
            email: lwEmail,
          },
        });
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
      console.log(user)
      // create the JWT web token, aka our identity card
      const token = jwt.sign(
        { id: user.id, email: req.body.email},
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