import { Request, Response } from 'express'; // eslint-disable-line
import os from 'os';
import b64url from 'base64url';
import moment from 'moment';

export const reqLogger = (req: Request, res: Response, next: any) => {
  const trackHdr = setTracking(req);
  req.headers.net_track = trackHdr;

  res.on('finish', () => {
    const newTrackHdr: any = req.headers.net_track;
    const newTrack: any = JSON.parse(b64url.decode(newTrackHdr));
    const t2: number = Date.now();
    const stringTime: string = moment().format();
    console.info(`${stringTime} uuid: ${newTrack.uuid} | ${newTrack.url} |`
      + ` tt: ${t2 - newTrack.t1} | status: ${res.statusCode} | `);
  });

  next();
};

function setTracking(req: any) {
  const track = {
    host: os.hostname(),
    url: `${req.method.toLowerCase()}: ${req.path}`,
    t1: Date.now(),
    uuid: _genUuid(),
  };
  const curTime: string = moment().format();
  // Log every request
  if (req.method === 'POST') {
    console.info(`${curTime} (Inc ${track.uuid}) ${req.method.toUpperCase()}:`
      + ` ${req.url}`, JSON.stringify(req.body));
  } else {
    console.info(`${curTime} (Inc ${track.uuid}) ${req.method.toUpperCase()}:`
      + ` ${req.url}`, JSON.stringify(req.params));
  }

  return b64url.encode(JSON.stringify(track));
}

function _genUuid(): number {
  return Math.round(Math.random() * 10 ** 6);
}
