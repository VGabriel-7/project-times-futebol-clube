import { compareSync } from 'bcryptjs';
import { IJwt, IRole, IUserLogin } from '../interfaces';
import User from '../database/models/UserModel';

export default class UserService {
  constructor(private user = User) {}

  public async login(userLogin: IUserLogin): Promise<IJwt | boolean> {
    const { email, password } = userLogin;

    const user = await this.user.findOne({ where: { email } });

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

  public async typeUser(id: number): Promise<IRole | null> {
    const role = await this.user.findByPk(id, { attributes: ['role'] });

    return role;
  }
}
