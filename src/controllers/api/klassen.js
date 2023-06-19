import DataSource  from '../../lib/DataSource.js';

export const getAllKlassen = async (req, res, next) => {
    try {
        const klasRepo = DataSource.getRepository("Klassen");
        const allklassen = await klasRepo.find();
        res.status(201).json(allklassen);
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    }  
};

export const getKlas = async (req, res, next) => {
    try {
        const { id } = req.params;
        const klasRepo = DataSource.getRepository("Klassen");
        const klas = await klasRepo.findBy({id: id});
        res.status(201).json(klas);
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    }  
};

export const deleteKlas = async (req, res, next) => {
    try {
        const  id  = req.body.id;
        const klasRepo = DataSource.getRepository("Klassen");
        const klasToDelete = await klasRepo.findOneBy({ id :id });
        await klasRepo.delete(klasToDelete);
        res.status(204).json({
            status: 'Entity is verwijderd'
        });
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    } 
};

export const postKlas = async (req, res, next) => {
    try {
        const klasRepo = DataSource.getRepository("Klassen");
        const klas = await klasRepo.save(req.body);
        res.status(201).json({
            status: 'Inserted with succses.',
            id: klas.id
        })
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    }  
};

export const updateKlas = async (req, res, next) => {
    try {
        const klasRepo = DataSource.getRepository("Klassen");  
        const  id  = req.body.id;
        const klas = await klasRepo.findOneBy({ id: id });
        let update;
        update = {
            naam: req.body.naam
        }
        const updateKlas= {
            ...klas,
            ...update
            
        }
        await klasRepo.save(updateKlas); 
        res.status(201).json({
            status: 'Inserted with succses.'
        })
    } catch(e) {
        res.status(500).json({
            status: e.message
        })
    }  
};