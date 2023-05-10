import jwt from 'jsonwebtoken';
import DataSource from '../lib/DataSource.js';

// eslint-disable-next-line consistent-return
export const jwtAuth = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    // get the payload data out of the token
    const { id } = jwt.verify(token, process.env.TOKEN_SALT);
    console.log(id);

    // go to next chain
    next();
  } catch (e) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};
