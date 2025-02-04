import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {


  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d'
  });

  res.cookie('token', token, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true,
    sameSite: 'strict'
  });

  return token;

}