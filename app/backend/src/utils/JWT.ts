import { config } from 'dotenv';
import { verify, sign } from 'jsonwebtoken';
import { IJwt, IToken } from '../interfaces';

config();

export const createToken = (data: IJwt | boolean) => {
  const token = sign({ data }, String(process.env.JWT_SECRET), {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return token;
};

export const validateTk = (token: string) => {
  try {
    const { data } = verify(token, String(process.env.JWT_SECRET)) as IToken;

    return data;
  } catch (error) {
    const err = new Error('Invalid token');
    err.message = 'Invalid token';
    throw err;
  }
};
