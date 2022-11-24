import { compareSync } from 'bcryptjs';
import { IJwt, IRole } from '../interfaces';
import User from '../database/models/UserModel';

interface IUserLogin {
  email: string;
  password: string;
}

export default class UserService {
  public static async login(userLogin: IUserLogin): Promise<IJwt | boolean> {
    const { email, password } = userLogin;

    const user = await User.findOne({ where: { email } });

    const logged = user && compareSync(password, user.password);

    if (logged) {
      return {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      };
    }

    return false;
  }

  public static async typeUser(id: number): Promise<IRole | boolean> {
    const user = await User.findByPk(id);

    if (user) return { role: user.role };

    return false;
  }
}
