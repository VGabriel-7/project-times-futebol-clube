import * as express from 'express';
import UserController from '../controllers';

const route = express.Router();

route.post('/', UserController.login);

export default route;
