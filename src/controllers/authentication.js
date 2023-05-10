import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import DataSource from '../lib/DataSource.js';

export const register = async (req, res) => {
    // errors
    const { formErrors } = req;
  
    // input fields
    const inputs = [
      {
        name: 'email',
        label: 'E-mail',
        type: 'text',
        value: req.body?.email ? req.body.email : '',
        error: req.formErrorsFields?.email ? req.formErrorsFields.email : null,
      },
      {
        name: 'password',
        label: 'Wachtwoord',
        type: 'password',
        value: req.body?.password ? req.body.password : '',
        error: req.formErrorsFields?.password
          ? req.formErrorsFields.password
          : null,
      },
    ];
 
    // render the register page
    res.render('register', {
      layout: 'authentication',
      inputs,
      formErrors,
    });
  };
  
  export const login = async (req, res) => {
    // errors
    const { formErrors } = req;
  
    // input fields
    const inputs = [
      {
        name: 'email',
        label: 'E-mail',
        type: 'text',
        value: req.body?.email ? req.body.email : '',
        error: req.formErrorsFields?.email ? req.formErrorsFields.email : null,
      },
      {
        name: 'password',
        label: 'Wachtwoord',
        type: 'password',
        value: req.body?.password ? req.body.password : '',
        error: req.formErrorsFields?.password
          ? req.formErrorsFields.password
          : null,
      },
    ];
  
    // render the login page
    res.render('login', {
      layout: 'authentication',
      inputs,
      formErrors,
    });
  };
  

export const postRegister = async (req, res, next) => {
	
    try {
        const errors = validationResult(req);
     
        // if we have validation errors
        if (!errors.isEmpty()) {
          console.log("We\'ve got some errors, dude...");
        }
        
      } catch(e) {
        next(e.message);
};
}
  
  export const postLogin = async (req, res, next) => {
  };
  
  export const logout = async (req, res) => {
  }