import DataSource  from '../../lib/DataSource.js';

export const getAllUsers = async (req, res, next) => {
    try {
        const userRepo = DataSource.getRepository("User");
        const allUsers = await userRepo.find();
        res.status(201).json(allOef);
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    }  
};

export const getOef = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userRepo = DataSource.getRepository("User");
        const user = await userRepo.findBy({id: id});
        res.status(201).json(oef);
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    }  
};

export const deleteOef = async (req, res, next) => {
    try {
        const  id  = req.body.id;
        const userRepo = DataSource.getRepository("User");
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

export const postOef = async (req, res, next) => {
    try {
        const userRepo = DataSource.getRepository("User");
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

export const updateOef = async (req, res, next) => {
    try {
        const userRepo = DataSource.getRepository("User"); 
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