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
  try {
    const subjectRepo = DataSource.getRepository('Vakken');

    const subject = await subjectRepo.findOne({
      where: {
        naam: req.body.naam,
        description: req.body.description,
        abbreviation: req.body.abbreviation
      }
    });

    if (subject) {
      res.status(200).send("Vak bestaat al");
    } else {
      await subjectRepo.save(req.body);
      res.status(201).send("Vak succesvol toegevoegd");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Er is een interne serverfout opgetreden");
  }
};



export const subjectDetail = async (req, res) => {
  const avatars = getAvatars();
  const subjectRepo = DataSource.getRepository('Vakken')
  const { vakkenId } = req.params;
  console.log(vakkenId)
  const detailSubject = await subjectRepo.findOneBy({ id: vakkenId }, { relations: ["oefeningen"] });


  const exercisRepo = DataSource.getRepository('Oefeningen')

const detailExercises = await exercisRepo.find({where: {id: vakkenId}})
  console.log( detailExercises)
  res.render("detailVak", {
    user: req.user,
    avatars,
    detailSubject,
    detailExercises
  });
}

export const exercises = async(req, res) => {

  const avatars = getAvatars();

  res.render("vakken", {
    user: req.user,
    avatars
  });

}