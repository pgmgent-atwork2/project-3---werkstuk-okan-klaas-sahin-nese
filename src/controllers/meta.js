import { getAvatars } from "../lib/helpers.js";
import DataSource from '../lib/DataSource.js';

export const getAllStudentsMeta = async (req, res, next) => {
  const avatars = getAvatars();
  try {
    // Get the repositories
    const userMetaRepo = DataSource.getRepository("Usermeta");
    const studentRepo = DataSource.getRepository("Student");
    const stafRepo = await DataSource.getRepository('Staf');
    const roleRepo = await DataSource.getRepository("Role");
    // Get the userMeta data with the student relation
    const allUserMetas = await userMetaRepo.find({
      relations: ["student"],
    });

    const user = await stafRepo.findOne({
      where: { id: req.user.id },
      relations: ["role"], 
    });
    console.log("User:", user);

    const roles = await roleRepo.find();
    console.log(roles);
    const userRole = user?.role?.label || 'Geen rol'; 

    const updatedMeta = await Promise.all(
      allUserMetas.map(async (userMeta) => {
        const date = new Date(userMeta.geboortedatum);
        const student = userMeta.student;

        if (student) {
          const klassen = await studentRepo.find({
            relations: ["klassen"],
            where: { id: student.id },
          });

          const klassenArray = klassen.map((student) => student.klassen.naam);

          return {
            ...userMeta,
            geboortedatum: `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`,
            classroom: klassenArray,
          };
        } else {
          return {
            ...userMeta,
            geboortedatum: `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`,
            classroom: [],
          };
        }
      })
    );
    res.render("studentPage", {
      avatars,
      allUserMetas: updatedMeta,
      userRole
    });
  } catch (e) {
    next(e.message);
  }
};

export const getAllStafMeta = async (req, res, next) => {
    const avatars = getAvatars();
    try {
        // get the repo
        const userMetaRepo = DataSource.getRepository("Usermeta");
        const stafRepo = await DataSource.getRepository('Staf')
        const roleRepo = await DataSource.getRepository("Role");
        //get the userMeta and return them with status code 200
        const allUserMetas = await userMetaRepo.find(
          {relations:['staf']}
        );
        const user = await stafRepo.findOne({
          where: { id: req.user.id },
          relations: ["role"], 
        });
        console.log("User:", user);
        
        const roles = await roleRepo.find();
        console.log(roles);
        const userRole = user?.role?.label || 'Geen rol'; 

        const updatedMeta = await Promise.all(
          allUserMetas.map(async (userMeta) => {
            const date = new Date(userMeta.geboortedatum);

              return {
                ...userMeta,
                geboortedatum: `${date.getDate()} / ${date.getMonth()} / ${date.getFullYear()}`,
              };
          })
        );
        res.render("teacherPage", {
            avatars,
            allUserMetas:updatedMeta,
            userRole
          });
    } 
 catch(e) {
    next(e.message);
}  
}