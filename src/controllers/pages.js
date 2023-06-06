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

export const addSubj = async (req, res) => {
  const avatars = getAvatars();
  res.render("addSubj", {
    user: req.user,
    avatars
  });
}

export const addSubjPost = async (req, res) => {
  try{
    const subjectRepo = DataSource.getRepository('Vakken')
    const exercisesRepo = DataSource.getRepository('Oefeningen')

    const subject = await subjectRepo.findOne({
      where:{
        naam: req.body.naam
      }
    })

  } catch (e){
// formulier om vak toe toe voegen opvangen en in db posten
console.log(req.body);
  }
 
}


export const subjectDetail = async (req, res) => {
  
  const avatars = getAvatars();
  const subjectRepo = DataSource.getRepository('Vakken')
  const { id } = req.params;
  const detailSubject = await subjectRepo.findOneBy({ id})

  res.render("addSubj", {
    user: req.user,
    avatars,
    detailSubject
  });
}

export const exercises = async(req, res) => {

  const avatars = getAvatars();

  res.render("vakken", {
    user: req.user,
    avatars
  });

}