import DataSource  from '../../lib/DataSource.js';

export const getAllStaf = async (req, res, next) => {
    try {
        const userRepo = DataSource.getRepository("staf");
        const allUsers = await userRepo.find();
        res.status(201).json(allUsers);
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    }  
};

export const getStaf = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userRepo = DataSource.getRepository("staf");
        const user = await userRepo.findBy({id: id});
        res.status(201).json(user);
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    }  
};

export const deleteStaf = async (req, res, next) => {
    try {
        const  id  = req.params.id;
        const userRepo = DataSource.getRepository("staf");
        const userToDelete = await userRepo.findOneBy({ id :id });
        await userRepo.delete(userToDelete);
        
        res.redirect("/teacher");
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    } 
};

export const postStaf = async (req, res, next) => {
    try {
        const userRepo = DataSource.getRepository("staf");
        const staf = await userRepo.save(req.body);
        res.status(201).json({
            status: 'Inserted with succses.',
            id : staf.id
        })
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    }  
};

export const updateStaf = async (req, res, next) => {
    try {
        const userRepo = DataSource.getRepository("staf"); 
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