import { Request, Response, NextFunction } from 'express'; // eslint-disable-line

interface Options {
  err: Error;
  msg?: string | boolean;
  status?: number;
  extraParams?: object;
}

/**
 * Error Handling Middleware for requests
 * @param err Raw error
 * @param status Status code to return
 * @param msg Msg to send. Put false for general message, true to send raw error
 * @param req Place Request here
 * @param res Place Response here
 */
export const errorHandler = (options: Options, _req: Request, res: Response
  , _next: NextFunction) => { // eslint-disable-line
  const {
    err,
    msg,
    status,
    extraParams,
  } = options;
  if (err === undefined) {
    console.error(options);
  } else if (typeof (err) === 'string') {
    console.error(err);
  } else if (err instanceof Error) {
    console.error(err.stack || 'Unknown Error');
  }
  let errorMsg: string;

  if (msg === undefined || msg === true) {
    if (err !== undefined) {
      errorMsg = err.stack || 'Unknown Error';
    } else {
      errorMsg = 'Unknown Error 1';
    }
  } else if (msg === null) {
    if (status === 500) {
      errorMsg = 'Internal Server Error';
    } else {
      errorMsg = 'Invalid Request';
    }
  } else {
    errorMsg = msg || 'Unknown Error';
  }

  const errorJson: object = { error: errorMsg, ...extraParams };

  res.status(status || 400).json(errorJson);
};
