import { NextFunction, Request, Response } from 'express';
import { ITeamService } from '../interfaces/IFunctions';
import { validateTk } from '../utils';

const HTTP_UNPROCESSABLE_ENTITY = 422;
const HTTP_NOT_FOUND = 404;
const HTTP_UNAUTHORIZED = 401;

export default class MatchMiddleware {
  constructor(private teamService: ITeamService) {}

  public async verifyInfoToCreateMatch(req: Request, res: Response, next: NextFunction) {
    const { homeTeam, awayTeam } = req.body;

    const thereIsAMatch = await this.teamService.getTeam(Number(homeTeam));
    const thereIsAMatch2 = await this.teamService.getTeam(Number(awayTeam));

    if (!thereIsAMatch || !thereIsAMatch2) {
      return res.status(HTTP_NOT_FOUND).json({
        message: 'There is no team with such id!' });
    }

    if (homeTeam === awayTeam) {
      return res.status(HTTP_UNPROCESSABLE_ENTITY).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    next();
  }

  public static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    try {
      validateTk(authorization as string);

      next();
    } catch (error) {
      res.status(HTTP_UNAUTHORIZED).json({ message: 'Token must be a valid token' });
    }
  }
}
