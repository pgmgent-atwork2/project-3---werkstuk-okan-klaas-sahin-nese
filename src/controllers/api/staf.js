/* eslint-disable prefer-const */
import DataSource from '../../lib/DataSource.js';

export const getAllStaf = async (req, res) => {
  try {
    const userRepo = DataSource.getRepository('Staf');
    const allUsers = await userRepo.find();
    res.status(201).json(allUsers);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const getStaf = async (req, res) => {
  try {
    const { id } = req.params;
    const userRepo = DataSource.getRepository('Staf');
    const user = await userRepo.findBy({ id });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const deleteStaf = async (req, res) => {
  try {
    const { id } = req.params;
    const userRepo = DataSource.getRepository('Staf');
    const userToDelete = await userRepo.findOneBy({ id });
    console.log(userToDelete);
    res.redirect('/teacher');
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const postStaf = async (req, res) => {
  try {
    const userRepo = DataSource.getRepository('Staf');
    const staf = await userRepo.save(req.body);
    res.status(201).json({
      status: 'Inserted with succses.',
      id: staf.id,
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const updateStaf = async (req, res) => {
  try {
    const userRepo = DataSource.getRepository('Staf');
    const { id } = req.body;
    const user = await userRepo.findOneBy({ id });
    let update;
    update = {
      // moet ik nog verder bekijken
    };
    const updateOef = {
      ...user,
      ...update,
    };
    await userRepo.save(updateOef);
    res.status(201).json({
      status: 'Inserted with succses.',
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};
