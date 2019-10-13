import snoowrap, { Submission } from 'snoowrap';
import { Response, Request, NextFunction, Router } from 'express'; // eslint-disable-line
import { cfg } from 'common-util/configs';

export const router = Router();

const r = new snoowrap({ // eslint-disable-line
  userAgent: cfg.snoowrap.userAgent,
  clientId: cfg.snoowrap.clientId,
  clientSecret: cfg.snoowrap.clientSecret,
  refreshToken: cfg.snoowrap.refreshToken,
});

export const getPosts = (req: Request, res: Response, next: NextFunction): void => {
  const { keyword }: { keyword: string } = req.query;
  getPostsByKeyword(keyword);
  res.status(200).json({});
};

const getPostsByKeyword = (keyword: string): object | void => {
  r.getHot('news').then((submissions: Array<Submission>) => {
    submissions.forEach((submission: Submission) => {
      console.log(submission.id);
    });
  });
};
