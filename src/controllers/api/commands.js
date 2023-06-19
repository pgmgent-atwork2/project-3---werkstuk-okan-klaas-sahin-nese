import DataSource from '../../lib/DataSource.js';

export const getAllCommands = async (req, res) => {
  try {
    const commandsRepo = DataSource.getRepository('Commands');
    const allCommands = await commandsRepo.find();
    res.status(201).json(allCommands);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const getCommand = async (req, res) => {
  try {
    const { id } = req.params;
    const commandsRepo = DataSource.getRepository('Commands');
    const command = await commandsRepo.findBy({ id });
    res.status(201).json(command);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const deleteCommand = async (req, res) => {
  try {
    const { id } = req.body;
    const commandsRepo = DataSource.getRepository('Commands');
    const commandToDelete = await commandsRepo.findOneBy({ id });
    await commandsRepo.delete(commandToDelete);
    res.status(204).json({
      status: 'Entity is verwijderd',
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const postCommand = async (req, res) => {
  try {
    const commandsRepo = DataSource.getRepository('Commands');
    const command = await commandsRepo.save(req.body);
    res.status(201).json({
      status: 'Inserted with succses.',
      id: command.id,
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};
