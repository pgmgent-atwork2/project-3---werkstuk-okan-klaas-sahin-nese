import jwt from 'jsonwebtoken';
import DataSource from '../lib/DataSource.js';
import * as dotenv from 'dotenv';
dotenv.config()
// eslint-disable-next-line consistent-return
export const jwtAuth = async (req, res, next) => {
  const { token } = req.cookies;
  
  try {
    // get the payload data out of the token
    const { id } = jwt.verify(token, process.env.TOKEN_SALT);
    console.log(id);

    // get the user out of the database
    const userRepository = DataSource.getRepository('staf');
    const user = await userRepository.findOne({
      where: { id }
    });

    // remove the password from the user object
    user.password = '';

    req.user = user;

    // go to next chain
    next();
  } catch (e) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};
