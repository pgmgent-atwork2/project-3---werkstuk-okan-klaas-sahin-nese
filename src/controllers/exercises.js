import DataSource from "../lib/DataSource.js";
import path from "path";
import fs from "fs";
import { PUBLIC_PATH, BASE_URL } from "../constants.js";
import { getAvatars } from "../lib/helpers.js";
import { validationResult } from "express-validator";

 export const exercises = async (req, res) => {
  const avatars = getAvatars();
  const subjectRepo = DataSource.getRepository("Vakken");

  const allSubjects = await subjectRepo.find();
  res.render("addMoreExercises", {
    user: req.user,
    avatars,
    allSubjects
  });
 };

export const addExercises = async (req, res) => {
    try {
        const avatars = getAvatars();
      const exerciseRepo = DataSource.getRepository("Oefeningen");
      const vakkenId = req.body.vakkenId;
  
      const exercise = await exerciseRepo.findOne({
        where:{
          naam: req.body.naam,
          link: req.body.link,
          niveau: req.body.niveau,
          vak:{id: vakkenId}
        }
      });
      if (exercise) {
        res.status(200).send("Oefening bestaat al");
      } else {
        await exerciseRepo.save({
            naam: req.body.naam,
            link: req.body.link,
            niveau: req.body.niveau,
            vak: {
              id: vakkenId,
            },
        })
        const subjectRepo = DataSource.getRepository("Vakken");
        const allSubjects = await subjectRepo.find();
        res.render('addMoreExercises', {
            user: req.user,
            avatars,
            allSubjects
        });
        };
    } catch (e) {
      console.log(e);
      res.status(500).send("Er is een fout opgetreden");
    }
  };
  
export const deleteExercise = async (req, res) => {
  try {
    const { oefeningId } = req.params;

    const exerciseRepo = DataSource.getRepository("Oefeningen");

    const exercise = await exerciseRepo.findOneBy({
      id: oefeningId,
    });

    if (exercise) {
      await exerciseRepo.delete(exercise);
      res.status(200).send("Vak succesvol verwijderd"); 
    } else {
      res.status(404).send("oefening niet gevonden"); 
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Er is een fout opgetreden"); 
  }
}