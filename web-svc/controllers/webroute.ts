import { Response, Request, Router } from 'express'; // eslint-disable-line

// Init router here
export const router = Router();

export const getLogin = (req: Request, res: Response) => {
  res.status(200).json({});
};

export const hello = 'l';
