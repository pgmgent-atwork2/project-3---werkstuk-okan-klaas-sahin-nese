import DataSource from "../lib/DataSource.js";
import path from "path";
import fs from "fs";
import { PUBLIC_PATH, BASE_URL } from "../constants.js";
import { getAvatars } from "../lib/helpers.js";
import { validationResult } from "express-validator";

export const getPersonalData = async (req, res) => {
    const avatars = getAvatars();
  
    res.render("personalData", {
      user: req.user,
      avatars,
    });
  };
  