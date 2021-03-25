import {NextFunction, Request, Response} from 'express';
import dbg from 'debug';

const debug = dbg('njs:accessLog');

export function accessLog() {
  return (req: Request, res: Response, next: NextFunction) => {
    debug('req.url', req.url);
    next();
  };
}
