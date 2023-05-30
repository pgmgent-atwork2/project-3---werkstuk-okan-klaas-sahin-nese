import { getAvatars } from "../lib/helpers.js";
import DataSource from '../lib/DataSource.js';

export const getAllStudentsMeta = async (req, res, next) => {
    const avatars = getAvatars();
    try {
        // get the repo
        const userMetaRepo = DataSource.getRepository("Usermeta");

        //get the userMeta and return them with status code 200
        const allUserMetas = await userMetaRepo.find({
            relations: ['student']
        });

       
        
        res.render("studentPage", {
            avatars,
            allUserMetas,
            
        });
    } catch(e) {
        next(e.message);
    }  
};

export const getAllStafMeta = async (req, res, next) => {
    const avatars = getAvatars();
    try {
        // get the repo
        const userMetaRepo = DataSource.getRepository("Usermeta");

        //get the userMeta and return them with status code 200
        const allUserMetas = await userMetaRepo.find();
        res.render("teacherPage", {
            
            avatars,
            allUserMetas,
          });
    } 
 catch(e) {
    next(e.message);
}  
}