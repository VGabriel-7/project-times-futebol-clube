import { Request, Response } from 'express';
import { HttpExpecption } from '../utils';

const httpErrorMiddleware = (err: Error, req: Request, res: Response) => {
  console.log('err', err);
  const { status, message } = err as HttpExpecption;
  res.status(status || 500).json({ message });
};

export default httpErrorMiddleware;
