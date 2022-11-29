import * as express from 'express';
import { UserMiddleware } from '../middlewares';
import { UserController } from '../controllers';
import UserService from '../services/user.service';

const route = express.Router();

const userService = new UserService();

const userController = new UserController(userService);

route.post('/', UserMiddleware.verifyFields, userController.login.bind(userController));

route.get('/validate', userController.typeUser.bind(userController));

export default route;
