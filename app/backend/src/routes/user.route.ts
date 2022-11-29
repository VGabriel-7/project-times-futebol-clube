import * as express from 'express';
import { UserMiddleware } from '../middlewares';
import { UserController } from '../controllers';

const route = express.Router();

route.post('/', UserMiddleware.verifyFields, UserController.login);

route.get('/validate', UserController.typeUser);

export default route;
