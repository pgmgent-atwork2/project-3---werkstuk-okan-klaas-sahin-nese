import { body } from "express-validator";

export default [
  body("email").isEmail().withMessage("Geef een geldig e-mailadres op"),
  body("password")
    .isLength({ min: 6, max: 20 })
    .withMessage("Het wachtwoord moet tussen de 6 en 20 karakters lang zijn"),
    body("voornaam")
    .isLength({ min: 2, max: 20 })
    .withMessage("De voornaam moet ingevuld worden"),
    body("achternaam")
    .isLength({ min: 2, max: 20 })
    .withMessage("De achternaam moet ingevuld worden"),
    body("geboortedatum")
    .isLength({ min: 3, max: 20 })
    .withMessage("De geboortedatum moet ingevuld worden"),
];