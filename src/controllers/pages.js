import DataSource from "../lib/DataSource.js";
import path from 'path';
import fs from 'fs';
import { PUBLIC_PATH, BASE_URL } from '../constants.js';
import { getAvatars } from "../lib/helpers.js";

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

export const exercises = async(req, res) => {

  const avatars = getAvatars();

  res.render("vakken", {
    user: req.user,
    avatars
  });

}