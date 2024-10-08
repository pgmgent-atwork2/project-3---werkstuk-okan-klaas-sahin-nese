/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
import DataSource from '../../lib/DataSource.js';

export const getAllVakken = async (req, res) => {
  try {
    const vakkenRepo = DataSource.getRepository('vakken');
    const allvakken = await vakkenRepo.find();
    res.status(201).json(allvakken);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const getVak = async (req, res) => {
  try {
    const { id } = req.params;
    const vakkenRepo = DataSource.getRepository('vakken');
    const vak = await vakkenRepo.findBy({ id });
    res.status(201).json(vak);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const deleteVak = async (req, res) => {
  try {
    const { id } = req.body;
    const vakkenRepo = DataSource.getRepository('Vakken');
    const vakToDelete = await vakkenRepo.findOneBy({ id });
    await vakkenRepo.delete(vakToDelete);
    res.status(204).json({
      status: 'Entity is verwijderd',
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const postVak = async (req, res) => {
  try {
    const vakkenRepo = DataSource.getRepository('Vakken');
    const vak = await vakkenRepo.save(req.body);
    res.status(201).json({
      status: 'Inserted with succses.',
      id: vak.id,
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const updateVak = async (req, res) => {
  try {
    const vakkenRepo = DataSource.getRepository('Vakken');
    const { id } = req.body;
    const vak = await vakkenRepo.findOneBy({ id });
    let update;
    update = {
      naam: req.body.naam,
    };
    const updateVak = {
      ...vak,
      ...update,
    };
    await vakkenRepo.save(updateVak);
    res.status(201).json({
      status: 'Inserted with succses.',
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};
