import DataSource from "../lib/DataSource.js";
import path from "path";
import fs from "fs";
import { PUBLIC_PATH, BASE_URL } from "../constants.js";
import { getAvatars } from "../lib/helpers.js";
import { validationResult } from "express-validator";

export const allCommands = async (req, res) => {
    const avatars = getAvatars();
    const commantsRepo = DataSource.getRepository("Commands");
  
    const allComments = await commantsRepo.find();
    res.render("detailVak", {
        user: req.user,
        avatars,
        allComments
    });
}