/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
import DataSource from '../../lib/DataSource.js';

export const getAllOef = async (req, res) => {
  try {
    const oefRepo = DataSource.getRepository('Oefeningen');
    const allOef = await oefRepo.find();
    res.status(201).json(allOef);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const getOef = async (req, res) => {
  try {
    const { id } = req.params;
    const oefRepo = DataSource.getRepository('Oefeningen');
    const oef = await oefRepo.findBy({ id });
    res.status(201).json(oef);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const deleteOef = async (req, res) => {
  try {
    const { id } = req.body;
    const oefRepo = DataSource.getRepository('Oefeningen');
    const oefToDelete = await oefRepo.findOneBy({ id });
    await oefRepo.delete(oefToDelete);
    res.status(204).json({
      status: 'Entity is verwijderd',
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const postOef = async (req, res) => {
  try {
    const oefRepo = DataSource.getRepository('Oefeningen');
    const oef = await oefRepo.save(req.body);
    res.status(201).json({
      status: 'Inserted with succses.',
      id: oef.id,
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const updateOef = async (req, res) => {
  try {
    const oefRepo = DataSource.getRepository('Oefeningen');
    const { id } = req.body;
    const oef = await oefRepo.findOneBy({ id });
    let update;
    update = {
      link: req.body.link,
    };
    const updateOef = {
      ...oef,
      ...update,
    };
    await oefRepo.save(updateOef);
    res.status(201).json({
      status: 'Inserted with succses.',
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};
