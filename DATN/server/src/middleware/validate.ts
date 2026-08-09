import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

interface ValidateOptions {
  body?: ZodType;
  params?: ZodType;
}

export const validate = (options: ValidateOptions): RequestHandler => {
  return (req, _res, next) => {
    try {
      if (options.body) req.body = options.body.parse(req.body);
      if (options.params) {
        Object.assign(req.params, options.params.parse(req.params));
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
