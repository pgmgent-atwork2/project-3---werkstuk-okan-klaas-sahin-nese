import { body } from 'express-validator';

export default [
  body('email').isEmail().withMessage('geef een geldig e-mailadres op'),
  body('password')
    .isLength({ min: 6, max: 15 })
    .withMessage('het wachtwoord moet tussen 6 en 15 karakters lang zijn'),
];
