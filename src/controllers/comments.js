import DataSource from "../lib/DataSource.js";
import path from "path";
import fs from "fs";
import { PUBLIC_PATH, BASE_URL } from "../constants.js";
import { getAvatars } from "../lib/helpers.js";
import { validationResult } from "express-validator";

export const allComments = async (req, res) => {
    const avatars = getAvatars();
    const commantsRepo = DataSource.getRepository("Commands");
    const subjectRepo = DataSource.getRepository("Vakken");
    const studentRepo = DataSource.getRepository("Student");

    let studentList = [];
    const allSubjects = await subjectRepo.find();
    const allComments = await commantsRepo.find();

    let studentComments = [];
    if (req.user && req.user.role === "student") {
      studentList = await studentRepo.find()
      studentComments = await commantsRepo.find({
        where: {
          vakken: { id: vakkenId },
          student: { id: studentId },
        },
      });
    }
    studentList = await studentRepo.find();
    
    res.render("addComment", {
        user: req.user,
        avatars,
        allComments,
        allSubjects,
        studentComments: studentComments,
        studentList: studentList,
    });
}

export const postComment = async (req, res) => {
    try {
      const avatars = getAvatars();
      const exerciseRepo = DataSource.getRepository("oefeningen");
      const studentRepo = DataSource.getRepository("student");
      const commentsRepo = DataSource.getRepository("commands");
      const vakkenId = req.body.vakkenId;
      const studentId = req.body.studentId;
  
      const student = await studentRepo.find(studentId);
  
      const comments = await commentsRepo.findOne({
        where: {
          inhoud: req.body.inhoud,
          vakken: {
            id: vakkenId,
          },
          student: student, // Geef de student als selectievoorwaarde mee
        },
      });
  
      if (comments) {
        res.status(200).send("commentaar bestaat al");
      } else {
        const command = {
          inhoud: req.body.inhoud,
          vakken: { id: vakkenId },
          student: [{ id: studentId}],
      }
      console.log(command)
        await commentsRepo.save(command);
      }
  
      const subjectRepo = DataSource.getRepository("Vakken");
      const allSubjects = await subjectRepo.find();
  
      res.render("addComment", {
        user: req.user,
        avatars,
        allSubjects,
      });
    } catch (e) {
      console.log(e);
      res.status(500).send("Er is een fout opgetreden");
    }
  };
  
  