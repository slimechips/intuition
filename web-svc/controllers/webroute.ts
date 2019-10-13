import { Response, Request, NextFunction, Router } from 'express'; // eslint-disable-line
import { cfg } from 'common-util/configs';
import { runPython } from 'common-util/python';
import { ResMsg } from '../models/ResMsg.model';

// Init router here
export const router = Router();

export const getPerspectives = (req: Request,
  res: Response, next: NextFunction): void => {
  getTwitter(getSearchParams(req.query.searchText))
    .then((data: object) => {
      res.status(200).json(data);
    })
    .catch((err: Error) => next({ err, status: 500, msg: ResMsg.INTERNAL_ERROR }));
};

const getSearchParams = (query: string): string[] => {
  const fQuery = `${decodeURIComponent(query)} opinion`;
  console.log(`query = ${fQuery}`);
  return fQuery.split(/[\s,]+/);
};

const getTwitter = (query: string[]): Promise<object> => {
  return new Promise((resolve, reject): void => {
    runPython(cfg.python.twitter, query)
      .then((data: object) => {
        // process the data
        resolve(data);
      })
      .catch(reject);
  });
};
