import { Request, Response } from 'express';
import { createToken } from '../utils/index';
import UserService from '../services/user.service';

export default class UserController {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const login = await UserService.login({ email, password });

    if (!login) return res.status(401).json({ message: 'Username or password invalid' });

    const token = createToken(login);

    res.status(200).json({ token });
  }
}
