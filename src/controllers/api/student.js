import DataSource  from '../../lib/DataSource.js';

export const getAllStudents = async (req, res, next) => {
    try {
        const userRepo = DataSource.getRepository("student");
        const allUsers = await userRepo.find();
        res.status(201).json(allUsers);
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    }  
};

export const getStudents = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userRepo = DataSource.getRepository("student");
        const user = await userRepo.findBy({id: id});
        res.status(201).json(user);
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    }  
};

export const deleteStudents = async (req, res, next) => {
    try {
        const  id  = req.body.id;
        const userRepo = DataSource.getRepository("student");
        const userToDelete = await userRepo.findOneBy({ id :id });
        await userRepo.delete(userToDelete);
        res.status(204).json({
            status: 'Entity is verwijderd'
        });
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    } 
};

export const postStudents= async (req, res, next) => {
    try {
        const userRepo = DataSource.getRepository("student");
        await userRepo.save(req.body);
        res.status(201).json({
            status: 'Inserted with succses.'
        })
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    }  
};

export const updateStudents = async (req, res, next) => {
    try {
        const userRepo = DataSource.getRepository("student"); 
        const  id  = req.body.id;
        const user = await userRepo.findOneBy({ id: id });
        let update;
        update = {
            //moet ik nog verder bekijken 
        }
        const updateOef= {
            ...user,
            ...update
            
        }
        await userRepo.save(updateOef); 
        res.status(201).json({
            status: 'Inserted with succses.'
        })
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    }  
};