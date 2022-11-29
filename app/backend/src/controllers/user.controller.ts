import { Request, Response } from 'express';
import { createToken, validateTk } from '../utils/index';
import { IUserService } from '../interfaces';

export default class UserController {
  constructor(private userService: IUserService) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const login = await this.userService.login({ email, password });

    if (!login) return res.status(401).json({ message: 'Incorrect email or password' });

    const token = createToken(login);

    return res.status(200).json({ token });
  }

  public async typeUser(req: Request, res: Response) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(400).json({ message: 'Token required for validation' });

    try {
      const jwt = validateTk(authorization);

      const role = await this.userService.typeUser(jwt.id);

      return res.status(200).json(role);
    } catch ({ message }) {
      res.status(401).json({ message });
    }
  }
}
