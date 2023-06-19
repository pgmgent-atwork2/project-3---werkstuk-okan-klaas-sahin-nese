import DataSource  from '../../lib/DataSource.js';

export const getAllStudents = async (req, res, next) => {
    try {
        const userRepo = DataSource.getRepository("Student");
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
        const userRepo = DataSource.getRepository("Student");
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
        const  id  = req.params.id;
        const userRepo = DataSource.getRepository("Student");
        const userToDelete = await userRepo.findOneBy({ id :id });
        await userRepo.delete(userToDelete);
        res.status(201).json({});
        res.redirect("/student");
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    } 
};

export const postStudents= async (req, res, next) => {
    try {
        const userRepo = DataSource.getRepository("Student");
        const user = await userRepo.save(req.body);
        res.status(201).json({
            status: 'Inserted with succses.',
            id : user.id
        })
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    }  
};

export const updateStudents = async (req, res, next) => {
    try {
        const userRepo = DataSource.getRepository("Student"); 
        const  id  = req.body.id;
        const user = await userRepo.findOneBy({ id: id });
        let update;
        if(req.body.id){
           update = {
            adres: req.body.adres,
            klas: {
                id : req.body.id 
            }
        } 
        }else{
            update = {
                adres: req.body.adres,
            }
        }
        const updateStudent= {
            ...user,
            ...update
            
        }
        await userRepo.save(updateStudent); 
        res.status(201).json({
            status: 'Inserted with succses.'
        })
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    }  
};