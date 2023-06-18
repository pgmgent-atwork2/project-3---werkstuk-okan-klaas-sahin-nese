import DataSource from "../lib/DataSource.js";
import path from "path";
import fs from "fs";
import { PUBLIC_PATH, BASE_URL } from "../constants.js";
import { getAvatars } from "../lib/helpers.js";
import { validationResult } from "express-validator";

export const home = async (req, res) => {
  const avatars = getAvatars();
  const stafRepo = await DataSource.getRepository('Staf')
  const user = await stafRepo.findOne({
    where: { id: req.user.id },
    relations: ["role"], 
  });
  console.log("User:", user);
  const roleRepo = await DataSource.getRepository("Role");
  const roles = await roleRepo.find();
  console.log(roles);
  const userRole = user?.role?.label || 'Geen rol'; 
  
  res.render("home", {
    user: req.user,
    userRole,
    avatars,
  });
};