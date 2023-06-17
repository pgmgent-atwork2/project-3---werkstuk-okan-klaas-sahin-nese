import DataSource from "../lib/DataSource.js";
import path from "path";
import fs from "fs";
import { PUBLIC_PATH, BASE_URL } from "../constants.js";
import { getAvatars } from "../lib/helpers.js";
import { validationResult } from "express-validator";

export const subjects = async (req, res) => {
  const avatars = getAvatars();

  const subjectRepo = DataSource.getRepository("Vakken");

  const allSubjects = await subjectRepo.find();

  res.render("vakken", {
    avatars,
    allSubjects,
  });
};

export const addSubj = async (req, res) => {
  const avatars = getAvatars();
  res.render("addSubj", {
    user: req.user,
    avatars,
  });
};

export const deleteSubject = async (req, res) => {
  try {
    const { vakkenId } = req.params;

    const subjectRepo = DataSource.getRepository("Vakken");

    const subject = await subjectRepo.findOneBy({
      id: vakkenId,
    });

    if (subject) {
      await subjectRepo.remove(subject);
      res.status(200).send("Vak succesvol verwijderd"); 
    } else {
      res.status(404).send("Vak niet gevonden"); 
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Er is een fout opgetreden"); 
  }
};


export const addSubjPost = async (req, res) => {
  try {
    const subjectRepo = DataSource.getRepository("Vakken");

    const subject = await subjectRepo.findOne({
      where: {
        naam: req.body.naam,
        description: req.body.description,
        abbreviation: req.body.abbreviation,
      },
    });

    if (subject) {
      res.status(200).send("Vak bestaat al");
    } else {
      await subjectRepo.save(req.body);
      res.render("addSubj");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Er is een fout");
  }
};

export const subjectDetail = async (req, res) => {
  try {
    const avatars = getAvatars();
    const subjectRepo = DataSource.getRepository("Vakken");
    const exerciseRepo = DataSource.getRepository("Oefeningen");
    const commantsRepo = DataSource.getRepository("Commands");

    const { vakkenId } = req.params;


    const detailSubject = await subjectRepo.findOne({
      where: { id: vakkenId },
      relations: ["oefeningen", 'commands']
    });

    if (detailSubject) {
      const exercises = await exerciseRepo.find({
        where: { 
          vak: { id: vakkenId } 
        },
  
      });
      const comments = await commantsRepo.find({
        where: { 
          vakken: { id: vakkenId } 
        },
      })

      res.render("detailVak", {
        user: req.user,
        avatars,
        detailSubject,
        detailExercises: exercises,
        detailCommants: comments,
      });
    } else {
      res.status(404).send("Vak niet gevonden");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Er is een fout opgetreden");
  }
};
