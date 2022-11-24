import { NextFunction, Request, Response } from 'express';

export default class UserMiddleware {
  public static async verifyFields(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

    next();
  }
}
