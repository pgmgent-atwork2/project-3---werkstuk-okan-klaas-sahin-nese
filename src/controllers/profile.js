import DataSource from '../lib/DataSource.js';
import { getAvatars } from '../lib/helpers.js';

export const getPersonalData = async (req, res) => {
  const avatars = getAvatars();
  const stafRepo = await DataSource.getRepository('Staf');
  const user = await stafRepo.findOne({
    where: { id: req.user.id },
    relations: ['role'],
  });
  console.log('User:', user);
  const roleRepo = await DataSource.getRepository('Role');
  const roles = await roleRepo.find();
  console.log(roles);
  const userRole = user?.role?.label || 'Geen rol';
  res.render('personalData', {
    user: req.user,
    avatars,
    userRole,
  });
};
